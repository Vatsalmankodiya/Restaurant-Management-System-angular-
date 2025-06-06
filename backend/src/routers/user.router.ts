import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
));

router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenReponse(user));
        }
        else {
            res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
        }

    }
));


// router.post("/login", asyncHandler(async (req, res) => {
//  const { email, password } = req.body;
//  const user = await UserModel.findOne({ email });

//  if (user) {
//       console.log("Stored Password in DB:", user.password);
//       res.send(generateTokenReponse(user));
//       res.send({ storedPassword: user.password });
//  } else {
//       res.status(HTTP_BAD_REQUEST).send("User not found!");
//  }
// }));

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST)
                .send('User is already exist, please login!');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenReponse(dbUser));
    }
));

router.post("/admin/login", asyncHandler(
    async (req, res) => {
        console.log("Login Attempt:", req.body);
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && password === user.password) {  // Direct text comparison - Consider removing in production
            if (user.isAdmin) {
                res.send(generateTokenReponse(user));
            } else {
                res.status(HTTP_BAD_REQUEST).send("Access Denied! Only admins can log in.");
            }
        } else {
            res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
        }
    }
));

// ✅ Add the Change Password Route (WITHOUT AUTHENTICATION - INSECURE)
router.post(
    '/change-password',
    asyncHandler(async (req, res) => {
        const { email, currentPassword, newPassword } = req.body;

        if (!email || !currentPassword || !newPassword) {
            res.status(HTTP_BAD_REQUEST).send('Please provide email, current password, and new password.');
            return;
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(HTTP_BAD_REQUEST).send('User not found.');
            return;
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            res.status(HTTP_BAD_REQUEST).send('Incorrect current password.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.send({ message: 'Password updated successfully' });
    })

);

const generateTokenReponse = (user: User) => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;