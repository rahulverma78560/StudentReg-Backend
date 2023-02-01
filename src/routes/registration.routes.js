import express from 'express'
import { getStudentsList, regStudent } from '../controller/studentReg.js'

const regRoutes = express.Router()

regRoutes.route('/regStudent').post(regStudent)
regRoutes.route('/getStudentsList').get(getStudentsList)

export default regRoutes
