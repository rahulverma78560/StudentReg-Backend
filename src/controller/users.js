import { readFileSync, writeFileSync } from "fs";
import generateResponse from "../utils/response-generator.js";
import bcrypt from "bcrypt";
import { createToken } from "../middleware/jwt-middleware.js";

const FILE_PATH = process.env.USERS_FILE_PATH || "./src/data/users.json";

export const register = (async (req, res) => {
    try {
        const users = JSON.parse(readFileSync(FILE_PATH).toString()),
            user = users.filter(
                (user) => user.username === req.body.userName
            );
        if (user.length) {
            return res.send(generateResponse('User already exist', 400))
        }
        const RegReq = {
            userName: req.body?.userName,
            password: req.body?.password
        }
        const hashedPwd = await bcrypt.hash(RegReq.password, 12);
        RegReq["password"] = hashedPwd;
        users.push(RegReq)
        writeFileSync(FILE_PATH, JSON.stringify(users))
        res.send(generateResponse("Registered Successfully", 201))
    } catch (error) {
        return res.send(generateResponse(error.message, 500))

    }
})

export const login = (async (req, res) => {
    try {
        const data = JSON.parse(readFileSync(FILE_PATH).toString());
        const user = data.filter(
            (user) => user.userName === req.body?.userName
        );
        if (user.length) {
            const validatePwd = await bcrypt.compare(
                req.body?.password,
                user[0]?.password
            );
            if (validatePwd) return res.send(generateResponse('Logged In Successfully', 200, createToken(user[0])));
            return res.send(new Error("Incorrect Password"));
        } else {
            return res.send(new Error("invalid user"));
        }
    } catch (error) {
        return res.send(generateResponse(error.message, 500))

    }
})