const express = require("express");
const passport = require("passport");
const cors = require("cors");
const router = require("./routes");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const { secret } = require("./config/auth.config");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const multer = require("multer");
const upload = multer();

const app = express();

var corsOptions = {
  origin: true,
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowheaders: ["Content-Type, Authorization"],
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/storage", express.static(path.join(__dirname, "public/storage")));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const isUploadRoute = req.originalUrl.startsWith("/api/images/upload");
  if (!isUploadRoute && (req.method === "POST" || req.method === "PUT")) {
    return upload.none()(req, res, next);
  }
  next();
});

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
