import { Sequelize } from "sequelize"
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD + '',
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    logging: false
})


export default sequelize
