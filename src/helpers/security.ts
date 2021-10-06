import { compare } from "bcryptjs";
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

const secretKey = process.env.JWT_SECRET || "$upercalifragi1is9797t95{~{P#$%^*ticexpialid0ciou$";
const options = {
  expiresIn: "24h",
  subject: process.env.JWT_SUBJECT || "Country-Search-nodeJS",
  issuer: process.env.JWT_ISSUER || "https://country-search.herokuapp.com",
};

export interface JWTPayload {
  username: string;
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
