import { Router } from 'express';
import {
  createPosts,
  createRoles,
  createUser,
  deletePosts,
  deleteRoles,
  deleteUser,
  findPosts,
  findPostsById,
  findRoles,
  findRolesById,
  findUsers,
  findUsersById,
  updatePosts,
  updateRoles,
  updateUser,
} from '@controllers';
import { loginUser, registerUser } from '@controllers/auth/authControllers';
import { getPermissions, verifyToken } from '@middlewares/auth';
import { checkRoles } from '@middlewares/roles';

const router = Router();

export default () => {
  router.get('/health', (req, res) => {
    res.send('OK');
  });

  // Auth routes
  router.post('/auth/register', checkRoles, registerUser);
  router.post('/auth/login', loginUser);

  // User routes
  router.get('/users', verifyToken, getPermissions, findUsers);
  router.get('/users/:id', verifyToken, getPermissions, findUsersById);
  router.post('/users', verifyToken, checkRoles, getPermissions, createUser);
  router.put('/users/:id', verifyToken, getPermissions, updateUser);
  router.delete('/users/:id', verifyToken, getPermissions, deleteUser);

  // Roles routes
  router.get('/roles', verifyToken, getPermissions, findRoles);
  router.get('/roles/:id', verifyToken, getPermissions, findRolesById);
  router.post('/roles', verifyToken, getPermissions, createRoles);
  router.put('/roles/:id', verifyToken, getPermissions, updateRoles);
  router.delete('/roles/:id', verifyToken, getPermissions, deleteRoles);

  // Posts Routes
  router.get('/posts', verifyToken, findPosts);
  router.get('/posts/:id', findPostsById);
  router.post('/posts', verifyToken, getPermissions, createPosts);
  router.put('/posts/:id', verifyToken, getPermissions, updatePosts);
  router.delete('/posts/:id', verifyToken, getPermissions, deletePosts);

  return router;
};
