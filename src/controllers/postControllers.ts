import { appLogger } from "@config/logger";
import { PostsRepository } from "@repositories/postRepository";
import { PostsService } from "@services/postService";
import { Handler } from "types/Handler";
import { IPostsRepository, IPostsService, Posts } from "types/PostsTypes";

const postsRepository: IPostsRepository = new PostsRepository();
const postsService: IPostsService = new PostsService(postsRepository);

export const findPosts:Handler = async (req, res) => {
  appLogger.info("req findPosts:>> ", req.currentUser);
  try {
    const Posts = await postsService.findPosts();
    if (Posts.length === 0) {
      res.status(404).json({ message: "no Posts Found." });
      return;
    }
    res.json(Posts);
  } catch (error) {
    appLogger.error("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findPostsById:Handler = async (req, res) => {
  try {
    const Posts = await postsService.findPostsById(req.params.id);
    if (!Posts) {
      res.status(404).json({ message: "Not role Found" });
      return;
    }

    res.json(Posts);
  } catch (error) {
    appLogger.error("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createPosts:Handler = async (req, res) => {
  try {
    const newRole: Posts = req.body;
    const result = await postsService.createPosts(newRole);

    res.status(201).json(result);
  } catch (error) {
    appLogger.error("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updatePosts:Handler = async (req, res) => {
  try {
    const Posts = await postsService.updatePosts(req.params.id, req.body);
    if (!Posts) {
      res.status(404).json({ message: "Not user Found" });
      return;
    }

    res.json(Posts);
  } catch (error) {
    appLogger.error("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deletePosts:Handler = async (req, res) => {
  try {
    const Posts = await postsService.deletePosts(req.params.id);
    if (!Posts) {
      res.status(404).json({ message: "Not user Found" });
      return;
    }

    res.json(Posts);
  } catch (error) {
    appLogger.error("error :>> ", error);
    res.status(500).json(error);
  }
};
