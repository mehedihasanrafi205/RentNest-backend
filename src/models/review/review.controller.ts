import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ReviewServices } from './review.service';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const result = await ReviewServices.createReviewIntoDB(tenantId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully!',
    data: result,
  });
});

const getReviewsForProperty = catchAsync(async (req: Request, res: Response) => {
  const { propertyId } = req.params;
  const result = await ReviewServices.getReviewsForPropertyFromDB(propertyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully!',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getReviewsForProperty,
};
