import express from "express";
import { generateToken } from "../midleware/auth.js";

const router = express.Router();

router.post("/", generateToken);

export default router;
