import express from 'express';
import { PropertyControllers } from './property.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';
import { validateRequest } from '../../middlewares/validateRequest';
import { PropertyValidation } from './property.validation';


const router = express.Router();

router.get('/', PropertyControllers.getAllProperties);
router.get('/:id', PropertyControllers.getSingleProperty);

router.post(
  '/create-listing', 
  auth(UserRole.LANDLORD),
  validateRequest(PropertyValidation.create),
  PropertyControllers.createProperty
);

export const PropertyRoutes = router;