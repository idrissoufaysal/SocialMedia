import express from "express";
import Comment from "../models/comments.js";
import User from "../models/user.js";
const router = express.Router();
import moment from "moment";
import authenticateUser from "../middlware/authorization.js";

//Aficher tous les commentaire
router.get("/", async (req, res) => {
  try {
    const postId = req.query.postId;

    const comments = await Comment.findAll({
      where: { postId },
      include: {
        model: User,
        attributes: ["id", "name", "profileImage"],
      },

      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      comments: comments,
      total: comments.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

//Ajouter un commentaire
router.post("/", authenticateUser, async (req, res) => {
  try {
    const comment = await Comment.create({
      desc: req.body.desc,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      userId: req.userInfo.id,
      postId: req.body.postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


export default router;
