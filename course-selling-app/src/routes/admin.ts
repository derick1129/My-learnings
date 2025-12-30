import { Router } from "express";
import { comparePassword, hashPassword } from "../utils/password";
import { Admin } from "../models/Admin";
import { signJwt } from "../utils/jwt";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const hashedPassword = await hashPassword(password);

  await Admin.create({
    email,
    password: hashedPassword,
  });

  res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await comparePassword(password, admin.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentails" });
  }

  const token = signJwt({ adminId: admin._id });

  res.json({ token });
});

export default router;
