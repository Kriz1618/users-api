import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService } from "types/UsersTypes";
import { Handler } from "types/Handler";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers: Handler = async (req, res) => {
  try {
    const users = await userService.findUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findUsersById: Handler = async (req, res) => {
  try {
    const user = await userService.findUsersById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser: Handler = async (req, res) => {
  try {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser: Handler = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser: Handler = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
