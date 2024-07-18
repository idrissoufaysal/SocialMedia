import { Sequelize, DataTypes, NUMBER, DATE } from 'sequelize'
import sequelize from '../db/db.js'


const Comment= sequelize.define('comments',
{
    desc:{
        type:DataTypes.STRING,
        allowNull: false
    },
   
    date: { 
        type: DATE,
    }
})


export default Comment