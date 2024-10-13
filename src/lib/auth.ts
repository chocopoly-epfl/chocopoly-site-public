import { jwtVerify, SignJWT } from "jose";
import { JWT_SECRET_KEY } from '$env/static/private';

export const JWT_TTL = "10m"; // 10 min
export const JWT_REFRESH_TTL = process.env.NODE_ENV === 'development'? Infinity : (1e3) * 60 * 5; // 5 min. This is the threshold at which a new token is provided to the user. i.e. if the JWT is going to expire in under 5 min, the middleware will update the auth cookie.

function getJwtSecretKey(): Uint8Array {
	const secret = JWT_SECRET_KEY;
	if (!secret) {
		throw new Error("JWT Secret key is not set");
	}
	return new TextEncoder().encode(secret);
}
  
export async function generateJwtToken(): Promise<string> {
	const sjt = new SignJWT({
			admin: true,
		}).setProtectedHeader({
			alg: "HS256",
		}).setExpirationTime(JWT_TTL);
	return await sjt.sign(getJwtSecretKey());
}
  
export async function verifyJwtToken(token: string) {
	try {
		const { payload } = await jwtVerify<App.Locals>(token, getJwtSecretKey());
		return payload;
	} catch (error) {
		return null;
	}
}
