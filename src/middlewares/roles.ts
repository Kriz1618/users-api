import { MiddlewareHandler } from "types/Handler";
import { IRolesRepository, IRolesService } from "types/RolesTypes";
import { RolesRepository } from "@repositories/rolesRepository";
import { RolesService } from "@services/rolesService";
import { appLogger } from "@config/logger";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

// @ts-expect-error
export const checkRoles: MiddlewareHandler = async (req, res, next) => {
  const roles: string[] = req.body && req.body?.roles ? req.body.roles : [];
  const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"];
  appLogger.info("req.body :>> ", role);

  try {
    const foundRoles = await rolesService.findRoles({ name: { $in: role } });
    if (foundRoles.length === 0) return res.status(404).send("Role not found");


    req.body.roles = foundRoles.map(x => x._id);

    appLogger.info("req.body.roles :>> ", req.body.roles);
    next();
  } catch (error) {
    appLogger.error("error :>> ", error);
    res.status(500).json(error);
  }
};
