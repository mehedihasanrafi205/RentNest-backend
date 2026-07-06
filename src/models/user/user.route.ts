import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';


const router = express.Router();

router.get(
  '/me',
  auth(UserRole.TENANT, UserRole.LANDLORD), 
  UserControllers.getMyProfile
);

router.patch(
  '/update-me',
  auth(UserRole.TENANT, UserRole.LANDLORD),
  UserControllers.updateMyProfile
);

export const UserRoutes = router;