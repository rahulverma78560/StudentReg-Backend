import { readFileSync, writeFileSync } from "fs";
import generateResponse from "../utils/response-generator.js";


const readFile = (async () => {
    const data = readFileSync(process.env.FILE_PATH)
    return JSON.parse(data.toString())
})

export const getStudentsList = (async (req, res) => {
    try {
        const students = await readFile()
        return res.send(generateResponse("success", 200, students))
    } catch (error) {
        return res.status(500).send(generateResponse(error.message, 500))
    }
})

export const regStudent = (async (req, res) => {
    try {
        const studentList = await readFile()
        studentList.push(req.body)
        writeFileSync(process.env.FILE_PATH, JSON.stringify(studentList))
        return res.send(generateResponse("Registered Successfully", 201))
    } catch (error) {
        return res.status(500).send(generateResponse(error.message, 500))

    }
})
export const deleteStudent = (async (req, res) => {
    try {
        const studentList = await readFile(),
            studentData = studentList.filter((stud) => req.params.studId !== stud._id)
        writeFileSync(process.env.FILE_PATH, JSON.stringify(studentData))
        return res.send(generateResponse("Deleted Successfully", 201))
    } catch (error) {
        return res.status(500).send(generateResponse(error.message, 500))
    }
})