import { Sequelize, DataTypes, NUMBER, DATE } from 'sequelize'
import sequelize from '../db/db.js'


const Post= sequelize.define('posts',
{
    title:{
        type:DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    file:{
        type:DataTypes.STRING,
    },
})


export default Post