import { compare, hash } from "bcryptjs";
import {
  sign,
  TokenExpiredError as TokenExpiredError0,
  verify,
} from "jsonwebtoken";

// (function() {
//   return {
//     secretKey: process.env.JWT_SECRET,
// options: {
//   expiresIn: "24h",
//   subject: process.env.JWT_SUBJECT,
//   issuer: process.env.JWT_ISSUER,
// }());

const secretKey = process.env.JWT_SECRET;
const options = {
  expiresIn: process.env.JWT_EXPIRY,
  subject: process.env.JWT_SUBJECT,
  issuer: process.env.JWT_ISSUER,
};

export interface JWTPayload {
  username: string;
  firstName?: string;
  lastName?: string;
}

export function generateToken(payload: JWTPayload) {
  if (!payload) {
    throw new Error("Token-payload is required");
  }

  return sign(payload, secretKey!, options);
}

export function verifyToken(token: string) {
  return verify(token, secretKey!, options);
}

export const TokenExpiredError = TokenExpiredError0;

export async function compareHash(
  rawValue: string,
  hashValue: string | undefined
) {
  return await compare(rawValue, hashValue || "");
}

export async function hashEvery(rawValue: string) {
  return await hash(rawValue, 10);
}
