import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PropertyServices } from './property.service';
import httpStatus from 'http-status';

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user?.id as string; 
  const result = await PropertyServices.createPropertyIntoDB(req.body, landlordId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Property listed successfully!',
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyServices.getAllPropertiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties retrieved successfully!',
    data: result,
  });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyServices.getSinglePropertyFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property details retrieved successfully!',
    data: result,
  });
});

export const PropertyControllers = {
  createProperty,
  getAllProperties,
  getSingleProperty,
};