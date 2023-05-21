import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import {UniversityRoute} from './route/UniversityRoute.js'
import {FacultyRoute} from './route/FacultyRoute.js'

dotenv.config()  //Оваа линија вчитува променливите од .env датотеката и ги прави достапни преку process.env.

const PORT = process.env.PORT // Вчитајте ja портата од променливата PORT во .env датотеката, ако не е достапна, користете 3300 како стандардна вредност

const app = express()
app.use(json()) // Оваа линија го користи json() middleware за парсирање на JSON податоци од барањата.
app.use(cors())

app.use('/universities', UniversityRoute);
app.use('/faculty', FacultyRoute);


const connectDB = async () => {  //Оваа линија дефинира асинхрона функција connectDB која се користи за поврзување со MongoDB базата на податоци со помош на mongoose.connect()
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongodb conected')
  } catch (err) {
    console.log(err)
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server running at ${PORT}`)
})




