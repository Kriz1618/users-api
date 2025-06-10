import { RolesRepository } from '@repositories/rolesRepository';
import { RolesService } from '@services/rolesService';
import { Handler } from 'types/Handler';
import { IRolesRepository, IRolesService } from 'types/RolesTypes';

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const findRoles: Handler = async (req, res) => {
  try {
    const roles = await rolesService.findRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findRolesById: Handler = async (req, res) => {
  try {
    const role = await rolesService.findRolesById(req.params.id);
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    res.json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRoles: Handler = async (req, res) => {
  try {
    const createdRole = await rolesService.createRoles(req.body);
    res.status(201).json(createdRole);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRoles: Handler = async (req, res) => {
  try {
    const role = await rolesService.updateRoles(req.params.id, req.body);
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    res.json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRoles: Handler = async (req, res) => {
  try {
    const role = await rolesService.deleteRoles(req.params.id);
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    res.json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};
