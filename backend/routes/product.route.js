import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts
} from "../controllers/product.controller.js";
import { validateRequest } from "../validations/middleware/validator.js";
import { productSchemaValidation } from "../validations/schemas/product.schema.js";

const router = express.Router();

router.post(
  "/create",
  validateRequest(productSchemaValidation.create),
  authenticateToken,
  addProduct
);

router.put(
  "/update/:id",
  validateRequest(productSchemaValidation.update),
  authenticateToken,
  editProduct
);
router.delete("/delete/:id", authenticateToken, deleteProduct);
router.get("/getall", authenticateToken, getAllProducts);

export default router;
