import express from "express";
import Like from "../models/likes.js";
import authenticateUser from "../middlware/authorization.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const postId = req.query.postId;
  try {
    const allLike = await Like.findAll({ where: { postId } });
    res.status(200).json(allLike.map((like) => like));
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Add like
router.post("/", authenticateUser, async (req, res) => {
  try {
    await Like.create({
      userId: req.userInfo.id,
      postId: req.body.postId,
    }).then((re) => res.status(200).json("has been liked"));
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete likes
router.delete("/", authenticateUser, async (req, res) => {
  await Like.destroy({
    where: {
      postId: req.query.postId,
      userId: req.userInfo.id,
    },
  })
  .then(r=>res.status(200).json("has been disliked"))
  .catch(e=>console.log(e));
});

export default router;
