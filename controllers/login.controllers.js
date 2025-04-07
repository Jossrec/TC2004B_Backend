import { sqlConnect, sql } from "../utils/sql.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const pool = await sqlConnect();

        // 1. Generar salt y hash
        const salt = crypto.randomBytes(16).toString('base64url').slice(0, 16);
        const newMsg = salt + req.body.password;
        const hashing = crypto.createHash("sha512");
        const hash = hashing.update(newMsg).digest("base64url");
        const securedPassword = salt + hash;

        // 2. Insertar en la tabla users con los campos nombre, username y password
        await pool.request()
            .input("nombre", sql.VarChar, req.body.nombre)
            .input("username", sql.VarChar, req.body.username)
            .input("password", sql.VarChar, securedPassword)
            .query("INSERT INTO users (nombre, username, password) VALUES (@nombre, @username, @password)");

        const data = await pool.request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM users WHERE username = @username");

        res.status(200).json({
            operation: true,
            message: "Usuario registrado correctamente",
            item: data.recordset[0],
        });
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({
            operation: false,
            message: "Error al registrar usuario",
            error: error.message,
        });
    }
};


export const login = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM users WHERE username = @username");

        if (data.recordset.length === 0) {
            return res.status(404).json({ isLogin: false, message: "Usuario no encontrado" });
        }

        const storedPassword = data.recordset[0].password;
        const salt = storedPassword.slice(0, 16);
        const newMsg = salt + req.body.password;
        const hashing = crypto.createHash("sha512");
        const hash = hashing.update(newMsg).digest("base64url");
        const securedPassword = salt + hash;

        const isLogin = storedPassword === securedPassword;

        if (isLogin) {
            const token = jwt.sign ({sub: data.recordset[0].id }, process.env.JWT, {expiresIn: "1h",})
            res.status(200).json({ isLogin: true, user: data.recordset[0], token:token });
        } else {
            res.status(401).json({ isLogin: false, message: "Contraseña incorrecta" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            isLogin: false,
            message: "Error durante el login",
            error: error.message,
        });
    }
};
export const updatePassword = async (req, res) => {
    try {
        const pool = await sqlConnect();

        const salt = crypto.randomBytes(16).toString('base64url').slice(0, 16);
        const newMsg = salt + req.body.password;
        const hashing = crypto.createHash("sha512");
        const hash = hashing.update(newMsg).digest("base64url");
        const securedPassword = salt + hash;

        await pool.request()
            .input("username", sql.VarChar, req.body.username)
            .input("password", sql.VarChar, securedPassword)
            .query("UPDATE users SET password = @password WHERE username = @username");

        const data = await pool.request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM users WHERE username = @username");

        res.status(200).json({ operation: true, item: data.recordset[0] });
    } catch (error) {
        console.error("Error en updatePassword:", error);
        res.status(500).json({
            operation: false,
            message: "Error al actualizar la contraseña",
            error: error.message,
        });
    }
};
