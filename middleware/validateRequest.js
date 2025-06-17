const validateRequest = (schema) => (req, res, next) => {
    console.log("Incoming body:", req.body); // 🔍 Add this line
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
      console.log("Validation Error:", error.details); // 🔍 Add this
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((e) => e.message),
      });
    }
  
    next();
  }; 