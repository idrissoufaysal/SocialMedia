import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const jwtSecrete = "fnidaf";
import express from "express";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashPass = bcrypt.hashSync(password, 10);
  //If user exit
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res
      .status(401)
      .json({ message: `l'utilisateur ${user.email} existe dejas` });
  }

  await User.create({
    email: email,
    password: hashPass,
    username: username,
  }).then((user) =>
    res.status(200).json({ message: "Compte cree avec success" })
  );
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //If user exita
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ message: "email or password incorrect" });
  }
  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass) {
    return res.status(400).json({ message: "mot de pass incorrect" });
  } else {
    const token = jwt.sign({ id: user.id }, "secretKey");
    const { password, ...other } = user.dataValues;
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        user:other,
        token:token  
      });
  }
});

router.post("/logout", async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("l'utilisateur a ete deconnecte");
});
export default router;
