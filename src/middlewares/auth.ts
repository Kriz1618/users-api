import { UserRepository } from '@repositories/userRepository';
import { UserService } from '@services/userService';
import { IUserRepository, IUserService, User } from 'types/UsersTypes';
import jwt from 'jsonwebtoken';
import { MiddlewareHandler } from 'types/Handler';
import { permissions, Method } from '../types/PermissionsTypes';
import { appLogger } from '@config/logger';
import { config } from '@config/config';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

// @ts-expect-error
export const verifyToken: MiddlewareHandler = async (req, res, next) => {
  const jwtSecret = config.jwtSecret;
  const token = req.headers.authorization?.replace(/^Bearer\s+/, '') as string;

  try {
    const verify = jwt.verify(token, jwtSecret) as User;
    const getUser = await userService.findUsersById(verify.id);
    if (!getUser) {
      return res.status(400);
    }

    req.currentUser = getUser;
    next();
  } catch (error: any) {
    appLogger.error('error :>> ', error);
    res.status(401).send(error.message);
  }
};

// @ts-expect-error
export const getPermissions: MiddlewareHandler = async (req, res, next) => {
  const { currentUser, method, path } = req;
  const { roles } = currentUser;

  appLogger.info('currentUser :>> ', currentUser);

  const currentModule = path.replace(/^\/([^\/]+).*/, '$1');

  appLogger.info('currentModule :>> ', currentModule);

  const foundMethod = permissions.find((x) => x.method === Method[method as keyof typeof Method]);

  if (!foundMethod?.permissions.includes(`${currentModule}_${foundMethod.scope}`)) {
    foundMethod?.permissions.push(`${currentModule}_${foundMethod.scope}`);
  }

  appLogger.info('foundMethod :>> ', foundMethod);

  // - Getting all permissions from all user roles
  // const rolesPermissions = roles?.map(role => role.permissions);
  // const flatPermissions = rolesPermissions?.flat();
  // const mergedPermissions = [new Set(flatPermissions)];
  const mergedRolesPermissions = [...new Set(roles?.flatMap((x) => x.permissions))];

  appLogger.info('mergedPermissions :>> ', mergedRolesPermissions);

  // - Verifying if user has custom permissions
  // - Permissions have higher priority than roles

  let userPermissions: string[] = [];

  if (currentUser.permissions?.length !== 0) {
    userPermissions = currentUser.permissions!;
  } else {
    userPermissions = mergedRolesPermissions;
  }

  // - Comparing builded permissions against the user roles permissions
  const permissionsGranted = foundMethod?.permissions.find((x) => userPermissions.includes(x));
  appLogger.info('permissionsGranted:>> ', permissionsGranted);

  if (!permissionsGranted) return res.status(401).send('Unauthorized!!!');

  next();
};
