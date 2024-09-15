import * as jose from "jose";

const JWT_SECRET = "SECRET";
const JWT_AUTH_EXP = "30d";

//这个函数使用 TextEncoder 将密钥字符串编码为 Uint8Array，这是加密库所要求的格式。
function encodedSecret() {
    return new TextEncoder().encode(JWT_SECRET)
}


export async function signJWT(payload) {
    const  token = await new jose.SignJWT(payload) //创建一个包含 payload 数据的 JWT；jose 是一个处理 JWT 的库。
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) //设置 JWT 的保护头部，包含加密算法（HS256）和类型（JWT）
    .setIssuedAt() //设置 JWT 的签发时间
    .setExpirationTime(JWT_AUTH_EXP) //设置 JWT 的过期时间（这里为 30 天）
    .sign(encodedSecret())//使用编码后的密钥签名 JWT。
    
    return token
}

export async function verifyJWT(token) {
    const verified = await jose.jwtVerify(
        token,
        encodedSecret()
    )
    console.log("verified: ", verified);
    return verified.payload
}