import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const { userId } = req.user;

    const Products = await Product.find({ userId: userId }).sort({
      name: 1,
    });
    res.status(200).json({Products: Products });
  } catch (e) {
    res.status(500).json({ error: true, message: e.message });
  }
};


//add product
export const addProduct = async (req, res) => {
  try {
    const { name, secondName, price, description, images, category } = req.body;
    const { userId } = req.user;
    //create a new product
    try {
      const pro = new Product({
        name,
        secondName,
        price,
        description,
        images,
        category,
        userId,
      });
      await pro.save();
      return res
        .status(201)
        .json({ story: pro, message: "Product created successfully." });
    } catch (e) {
      return res.status(400).json({ error: true, message: e.message });
    }
  } catch (error) {
    res.status(401).json({ error: true, message: e.message });
  }
};

//Update Product
export const editProduct = async (req, res) => {
  try {
    const { name, secondName, price, description, images, category } = req.body;
    const { userId } = req.user;
    const { id } = req.params;
    //create a new product
    try {
      //find product and enshore that it belong to authenticate user
      const productObj = await Product.findOne({ _id: id, userId: userId });
      if (!productObj) {
        return res
          .status(404)
          .json({ error: true, message: "product Not Found" });
      }

      productObj.name = name;
      productObj.secondName = secondName;
      productObj.price = price;
      productObj.description = description;
      productObj.category = category;
      // productObj.images = images;
      await productObj.save();
      res.status(200).json({ message: "product updated successfully." });
    } catch (e) {
      return res.status(400).json({ error: true, message: e.message });
    }
  } catch (error) {
    res.status(401).json({ error: true, message: e.message });
  }
};

//delete product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    console.log(id, userId);
    //find story and enshore that it belong to authenticate user
    const ProObj = await Product.findOne({ _id: id, userId: userId });
    if (!ProObj) {
      return res.status(404).json({ error: true, message: "Story Not Found" });
    }
    await ProObj.deleteOne({ _id: id, userId: userId });

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (e) {
    return res.status(404).json({ error: true, message: e.message });
  }
};
