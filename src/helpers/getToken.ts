import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodetoken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodetoken;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
