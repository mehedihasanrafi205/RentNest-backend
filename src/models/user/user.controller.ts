import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserServices } from './user.service';
import httpStatus from 'http-status';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string; 
  const result = await UserServices.getMyProfileFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully!',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await UserServices.updateMyProfileInDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile data updated successfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const isBanned = req.body?.isBanned;

  if (isBanned === undefined) {
    throw new Error('Please provide isBanned status in the request body (e.g., {"isBanned": true})');
  }

  const result = await UserServices.updateUserStatusInDB(id as string, isBanned);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated successfully!',
    data: result,
  });
});

export const UserControllers = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserStatus,
};