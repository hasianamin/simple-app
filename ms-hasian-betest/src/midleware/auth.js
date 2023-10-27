import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  successResponse,
  unauthorizedResponse,
} from "../services/responsesService.js";

dotenv.config();

export function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return unauthorizedResponse(res);
    }
    req.user = decoded;
    next();
  });
}

export function generateToken(req, res) {
  const adminKey = {
    isAdmin: true,
    username: "admin",
  };

  // Create a JWT token
  jwt.sign(
    { adminKey },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Token creation failed" });
      }

      return successResponse(res, token);
    }
  );
}
