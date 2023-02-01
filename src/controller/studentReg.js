import { readFileSync, writeFileSync } from "fs";


const readFile = (async () => {
    const data = readFileSync(process.env.FILE_PATH)
    return JSON.parse(data.toString())
})

export const getStudentsList = (async (req, res) => {
    try {

        const students = await readFile()
        res.send({ message: "success", code: 200, payload: students })
    } catch (error) {
        throw error
    }
})
export const regStudent = (async (req, res) => {
    try {
        const studentList = await readFile()
        studentList.push(req.body)
        writeFileSync(process.env.FILE_PATH, JSON.stringify(studentList))
        res.send({ message: "Registered Successfully", code: 201 })
    } catch (error) {
        throw error
    }
})