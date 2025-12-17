const express = require("express");
const cors = require("cors");
const path = require("node:path");
const bodyParser = require("body-parser");
require("dotenv").config();

const session = require("express-session");
const passport = require("passport");

const router = require("./src/router/index.routes");
const { sequelize } = require("./models"); 
const { secret } = require("./config/authConfigSecret");

const PORT = process.env.PORT || 3080;

const FrontendJoin = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(FrontendJoin));

app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 🔹 existing public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// 🔴 ADD THIS (uploads access)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (req, res) => {
  res.send("Transport Management System API running with Sequelize...");
});

app.use("/api", router);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database Connection Successful (Sequelize).");

    app.listen(PORT, () => {
      console.log(`Server Running: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
}

startServer();
