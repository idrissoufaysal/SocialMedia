import Post from "../models/post.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import express from "express";
const router = express.Router();
import upload from "../middlware/filUpload.js";
import multer from "multer";

/* GET POST */
router.get("/", async (req, res) => {
  // const token=req.cookies.accessToken;
  // if(!token) {
  //     return res.status(401).json("vous n'etes pas connecter")
  // }
  // jwt.verify(token,"secret",(err,userInfo)=>{
  //     if(err) return res.status(403).json('Token non valide')
  // })
  try {
    const posts = await Post.findAll({
      order: ["createdAt", "DESC"],
      attributes: ["id", "title", "desc","file", "createdAt", "updatedAt"],
      include: {
        model: User,
        attributes: ["id", "username", "profileImage"],
      },
    });
    res.status(200).json({
      total:posts.length,
      posts:posts});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Get userPost
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await Post.findAll({
      where: { userId: userId },
      order: ["createdAt", "DESC"],
      include: {
        model: User,
        attributes: ["id", "username", "profileImage"],
        
      },
    }).then((userPost) => {
      res.status(200).json({
        total:userPost.length,
        userPost:userPost});
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* Add post  */
router.post("/:userId", upload.single("image"), async (req, res) => {
  const userId = req.params.userId;
  const { title, desc } = req.body;
  const newPost = await Post.create({
    title: title,
    desc: desc,
    userId: userId,
    file: req.file.filename,
    createdAt: moment(Date.now()).format("YYYY-MM-DD"),
  });
  res.status(200).json(newPost);
});

/* Update userPost*/
router.put("/:userId/:postId", upload.single("file"), async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const { title, desc } = req.body;

  const file = req.file ? req.file.filename : null;

  try {
    const existingPost = await Post.findByPk(postId);
    if (!existingPost) {
      return res.status(404).json("Post non trouvé.");
    }
    existingPost.title = title || existingPost.title;
    existingPost.desc = desc || existingPost.desc;
    existingPost.file = file || existingPost.file;
    await existingPost
      .save()
      .then((post) =>
        res
          .status(200)
          .json({ message: "Post mis à jour avec succès.", updatedPost: post })
      );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:userId/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const existingPost = await Post.findByPk(postId);
    console.log(existingPost);
    if (!existingPost) {
      res.status(404).json({ message: "Post non trouvé." });
    } else {
      await existingPost.destroy();
      res.status(200).json({ message: "Post supprimé avec succès." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;

// export const getPosts = (req, res) => {
//   const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS P JOIN users AS u ON (u.id = p.userId)`;
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//   });
// };
