import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./config/db";
import productRoutes from "./routes/product";
import { errorHandlerMiddleware } from "./middlewares/error-handling-middleware";
import adminRouter from "./routes/admin";
import { setSocketInstance } from "./services/socket-service";

async function bootstrap() {
  dotenv.config();
  await connectDB();

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  app.use(express.json());
  app.use(cors());

  app.use("/api/products", productRoutes);
  app.use("/api/admin", adminRouter);

  setSocketInstance(io);

  app.use(errorHandlerMiddleware);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

bootstrap();
