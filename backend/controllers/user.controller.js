import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const Register = async (req, res) => {
  try {
    //get data from the request

    const { firstName, lastName, email, password } = req.body;

    //check if all data is valid
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    //check if this user not exist
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }
    // hashPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    //create access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    //confirming creating user
    return res.status(201).json({
      error: false,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessToken,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if data is valid
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    //check if this user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "User does not exist" });
    }

    //check if password is correct

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ error: true, message: "Incorrect password" });
    }

    //access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    return res.json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
