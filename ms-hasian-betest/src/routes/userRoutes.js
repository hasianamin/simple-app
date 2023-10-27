import express from "express";
import {
  createUser,
  findAllUser,
  findUserByIdentityNumber,
  findUserByAccountNumber,
  findUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../midleware/auth.js";
import { cacheUser } from "../midleware/cache.js";

const router = express.Router();

router.post("/", verifyToken, createUser);
router.get("/", verifyToken, findAllUser);
router.get(
  "/identity-number/:identityNumber",
  verifyToken,
  cacheUser,
  findUserByIdentityNumber
);
router.get(
  "/account-number/:accountNumber",
  verifyToken,
  cacheUser,
  findUserByAccountNumber
);
router.get("/id/:id", verifyToken, cacheUser, findUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
