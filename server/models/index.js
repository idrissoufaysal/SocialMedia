import User from "./user.js";
import Post from "./post.js";
import Comment from "./comments.js";
import Story from "./stories.js";
import Like from"./likes.js"
import Relation  from "./relation.js";

/*User & Post */
try {
  User.hasMany(Post);
  Post.belongsTo(User);
} catch (error) {
  console.log(error.message);
}

/* User & Comment */
try {
  User.hasMany(Comment);
  Comment.belongsTo(User);
} catch (error) {
  console.log(error.message);
}

/* User & Like */
try {
  User.hasMany(Like)
  Like.belongsTo(User)
  } catch (error) {
      console.log(error.message);
  }

/* User & Stories */
try {
  User.hasMany(Story)
  Story.belongsTo(User)
  } catch (error) {
      console.log(error.message);
  }

// Relation d'amitié entre les utilisateurs
User.belongsToMany(User, {
  through: Relation,
  as: 'friends',
  foreignKey: 'userId',
});

User.belongsToMany(User, {
  through: Relation,
  as: 'friendOf',
  foreignKey: 'friendId',
});

/* Post & Comment */
try {
  Post.hasMany(Comment);
  Comment.belongsTo(Post);
} catch (error) {
  console.log(error.message);
}

/* Post & Like */
try {
  Post.hasMany(Like)
  Like.belongsTo(Post)
  } catch (error) {
      console.log(error.message);
  }

   