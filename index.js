import express from 'express'
import dotenv from 'dotenv'
import sequelize from './utils/db.js'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import validation from './middleware/validation.js'
import fileUpload from 'express-fileupload'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 4006

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'uploads')))
app.use(fileUpload())
app.use('/api', validation)
app.use('/api', router)


// error handling  
app.use(errorHandler)


!async function () {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(error) {
        console.log("Aloo", error)
    }
}()

