import generateResponse from "../utils/response-generator.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const SECRET_KEY = process.env.SECRET_KEY || "rahulverma";
const EXPIRES_IN = process.env.EXPIRES_IN || 3000000;


export const createToken = (user) => {
  let payloadData = { userName: user.userName };
  const payload = payloadData;
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  return token;
};

export const verifyToken = (req, res, next) => {
  let response = "";
  try {
    if (!req.headers.authorization) {
      response = generateResponse("No authorization header", 401);
      return res.send(response);
    } else {
      let token = req.headers.authorization.split(" ")[1];
      if (token === "null" || !token) {
        response = generateResponse("No token found", 401);
        return res.send(response);
      } else {
        try {
          let payload = jwt.verify(token, SECRET_KEY);
          if (!payload) {
            response = generateResponse(
              "No payload found:unauthorized request",
              401
            );
            return res.send(response);
          }
        } catch (err) {
          response = generateResponse("Invalid token", 401);
          return res.send(response);
        }
      }
    }
  } catch (error) {
    response = generateResponse(error.message, 401);
    return res.send(response);
  }
  next();
};
