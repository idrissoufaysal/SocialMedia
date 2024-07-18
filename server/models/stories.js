import { Sequelize, DataTypes } from "sequelize";
import sequelize  from "../db/db.js";

const Story = sequelize.define("stories", {
  
  image: {
    type: DataTypes.STRING,
  },

 
});

export default Story;
