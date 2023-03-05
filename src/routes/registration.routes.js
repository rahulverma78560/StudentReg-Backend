import express from 'express'
import { deleteStudent, getStudentsList, regStudent } from '../controller/studentReg.js'
import { login, register } from '../controller/users.js'
import { verifyToken } from '../middleware/jwt-middleware.js'

const regRoutes = express.Router()

regRoutes.route('/register').post(register)
regRoutes.route('/login').post(login)
regRoutes.route('/regStudent').post(verifyToken, regStudent)
regRoutes.route('/getStudentsList').get(verifyToken, getStudentsList)
regRoutes.route('/deleteStudent/:studId').delete(verifyToken, deleteStudent)

export default regRoutes
