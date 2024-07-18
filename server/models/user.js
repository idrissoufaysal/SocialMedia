import { Sequelize, DataTypes } from "sequelize";
import  sequelize  from "../db/db.js";

const User = sequelize.define("users", {
  username: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverPicture: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
