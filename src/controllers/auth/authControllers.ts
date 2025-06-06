import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService, User } from "types/UsersTypes";
import { Handler } from "types/Handler";
import jwt from "jsonwebtoken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser: Handler = async (req, res) => {
  try {
    const userExists = await userService.findUsersByEmail(req.body.email);
    if (userExists) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const loginUser: Handler = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  if (!jwtSecret) {
    res.status(500).json({ message: "JWT secret is not defined" });
    return;
  }
  try {
    const { email, password }: User = req.body;
    const user = await userService.findUsersByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};
