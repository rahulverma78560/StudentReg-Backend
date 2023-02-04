import express from 'express'
import { deleteStudent, getStudentsList, regStudent } from '../controller/studentReg.js'

const regRoutes = express.Router()

regRoutes.route('/regStudent').post(regStudent)
regRoutes.route('/getStudentsList').get(getStudentsList)
regRoutes.route('/deleteStudent/:studId').delete(deleteStudent)

export default regRoutes
