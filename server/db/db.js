import { Sequelize } from 'sequelize'

const sequelize=  new Sequelize('SocialMedia1','root','',{dialect : 'mysql', host:'localhost'})

export default sequelize