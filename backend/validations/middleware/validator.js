export const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Replace request data with validated data
    req[property] = value;
    next();
  };
};
