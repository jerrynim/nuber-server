/*req로부터 받은 JWT로부터 id와 User를 찾는 함수 */

import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decode: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decode;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
