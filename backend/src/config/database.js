import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

// create connection db
const db = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: process.env.DB_DIALECT
    }
)

export default db;