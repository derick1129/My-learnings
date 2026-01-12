import express from "express";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "./types";
import { UserModel } from "./models";

const app = express();
app.use(express.json());

app.post("/auth/signup", async (req, res) => {
  const { success, data } = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      success: false,
      error: "Invalid request schema",
    });
    return;
  }

  const user = await UserModel.findOne({
    email: data.email,
  });

  if (user) {
    res.status(400).json({
      success: false,
      error: "Email already exists",
    });
    return;
  }

  //TODO: hash the password
  const userDb = await UserModel.create({
    email: data.email,
    password: data.password,
    name: data.name,
  });

  res.json({
    success: true,
    data: {
      _id: userDb._id,
      name: userDb.name,
      email: userDb.email,
      password: userDb.password,
    },
  });
});

app.post("/auth/login", async (req, res) => {
  const { success, data } = signinSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      success: false,
      error: "Invalid request schema",
    });
    return;
  }

  const userDb = await UserModel.findOne({
    email: data.email,
  });

  if (!userDb || userDb.password == data.password) {
    res.status(400).json({
      success: false,
      error: "Invalid email or password",
    });
    return;
  }

  const token = jwt.sign(
    {
      role: userDb.role,
      userId: userDb._id,
    }, process.env.JWT_PASSWORD!);

  res.json({
    success: true,
    data: {
      token,
    },
  });
});

app.listen(3000);
