import config from 'config';
import jwt from 'jsonwebtoken';
import AES from "crypto-js/aes.js";

function generateAccessToken(payload) {
    const token = jwt.sign(payload, config.get("jwtkey"), {
        expiresIn: "1h"
    });
    const cypherToken = AES.encrypt(token, config.get("cipherkey")).toString();
    return cypherToken;
}

export default generateAccessToken;