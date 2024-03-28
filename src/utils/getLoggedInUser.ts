import { getCookie } from "cookies-next";
import { DecodeOptions, decode } from "jsonwebtoken";

const getLoggedInUser = () => {
  const token = getCookie("authorization");

  if (!token) {
    return null;
  } else {
    const tokenParts = token.split(" ");
    if (
      tokenParts.length !== 2 ||
      (tokenParts[0] && tokenParts[0].toLowerCase() !== "bearer")
    ) {
      return null;
    }

    const userToken: string | undefined = tokenParts[1];
    if (userToken && userToken !== "undefined") {
      const loggedInUser =decode(userToken, process.env.JWT_SECRET as DecodeOptions) as {
        user: {
          name: string;
          email: string;
          password: string;
          id: number;
        }
      };
      
      return loggedInUser?.user;
    }
    return null;
  }
};

export default getLoggedInUser;
