import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';


const router = express.Router();

router.get(
  '/me',
  auth(UserRole.TENANT, UserRole.LANDLORD, UserRole.ADMIN), 
  UserControllers.getMyProfile
);

router.patch(
  '/update-me',
  auth(UserRole.TENANT, UserRole.LANDLORD, UserRole.ADMIN),
  UserControllers.updateMyProfile
);

router.get(
  '/',
  auth(UserRole.ADMIN),
  UserControllers.getAllUsers
);

router.patch(
  '/:id/status',
  auth(UserRole.ADMIN),
  UserControllers.updateUserStatus
);

export const UserRoutes = router;