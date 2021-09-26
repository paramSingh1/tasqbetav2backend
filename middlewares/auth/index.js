import jwt from 'jsonwebtoken';
import AES from "crypto-js/aes.js";
import enc from "crypto-js/enc-utf8.js";
import config from "config";

function verifyToken(req, res, next) {
    try {
        let token = req.headers["tasq-auth-token"];
        //Lets Decrypt the token
        let bufferToken = AES.decrypt(token, config.get("cipherkey"));
        bufferToken = enc.stringify(bufferToken);
        let decoded = jwt.verify(bufferToken, config.get("jwtkey"));
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Access Denied." });
    }
}

export default verifyToken;