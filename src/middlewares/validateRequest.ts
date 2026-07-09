import { ZodTypeAny, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((issue) => {
          return {
            field: issue.path[issue.path.length - 1],
            message: issue.message,
          };
        });

        res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Validation Error',
          errorDetails,
        });
        return;
      }
      next(error);
    }
  };
};
