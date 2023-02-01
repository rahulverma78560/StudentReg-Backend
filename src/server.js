import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import registrationRoutes from './routes/registration.routes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API is running...')
})
app.use('/api', registrationRoutes)



const PORT = process.env.PORT || 8080

app.listen(
    PORT,
    console.log(
        `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
