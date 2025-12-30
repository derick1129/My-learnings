import { Router } from "express";
import { User } from "../models/User";
import { comparePassword, hashPassword } from "../utils/password";
import { signJwt } from "../utils/jwt";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    email,
    password: hashedPassword,
  });

  res.json({ message: "User created " });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signJwt({ userId: user._id });

  res.json({ token });
});

export default router;
