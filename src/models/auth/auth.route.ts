import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.register),
  AuthControllers.registerUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.login),
  AuthControllers.loginUser
);

export const AuthRoutes = router;