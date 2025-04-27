import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    
    if (!token) return res.status(HTTP_UNAUTHORIZED).send({ message: "Access Denied" });

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        req.user = decodedUser;
        next(); // Ensure it proceeds to the next middleware
    } catch (error) {
        return res.status(HTTP_UNAUTHORIZED).send({ message: "Invalid Token" });
    }
};
