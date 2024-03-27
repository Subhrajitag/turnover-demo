import { getCookie } from "cookies-next";
import { decode } from "jsonwebtoken";
const secret: any = process.env.JWT_SECRET;

const getLoggedInUser = () => {
  const token = getCookie("authorization");
  const userToken: any = token?.substring(7, token.length);
  return decode(userToken, secret);
};
export default getLoggedInUser;
