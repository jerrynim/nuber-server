/* id값으로 Jwt생성 하는 함수 */

import jwt from "jsonwebtoken";

const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id
    },
    process.env.JWT_TOKEN || ""
  );
  return token;
};
/* https://passwordsgenerator.net/ */
export default createJWT;
