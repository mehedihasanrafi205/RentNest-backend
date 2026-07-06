import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { AuthRoutes } from "./models/auth/auth.route";
import { PropertyRoutes } from "./models/property/property.route";
import { BookingRoutes } from "./models/booking/booking.route";
import { UserRoutes } from "./models/user/user.route";

const app: Application = express();

// Application Middlewares
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Testing Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to RentNest API Server!",
  });
});

// Endpoints Mappings
app.use("/api/auth", AuthRoutes);
app.use("/api/properties", PropertyRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/users", UserRoutes);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
