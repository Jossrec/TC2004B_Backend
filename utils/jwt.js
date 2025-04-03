import jwt from "jsonwebtoken";
import { Router } from "express";


export const validateJWT = Router();

validateJWT.use((req, res, next) => {
    let token = req.headers.authorization;
    if (!token){
        res.status (401).json({msg: "se requiere un token"});
        return;
    }
    if (token.startsWith("Bearer")){
        token = token.split(" ")[1];
    }

    jwt.verify(token, process.env.JWT, (e, decoded)=>{
        if (e){
            res.status (401).json ({msg: "Token inválido: " + e.message });
        }
        else {
            req.decoded = decoded;
            next();
        }
    })
});
