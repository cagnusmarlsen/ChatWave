import  Express  from "express";
import  dotenv  from "dotenv";
import  mongoose  from "mongoose";
import authRoute from "./routes/auth.js"
import conversationsRoute from "./routes/conversations.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import messagesRoute from "./routes/messages.js"
import usersRoute from "./routes/users.js"

const app = Express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to DB");
      } catch (error) {
        throw(error);
      }
}

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(Express.json());

app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(4300, () => {
    console.log("Connected to backend");
    connect();
})