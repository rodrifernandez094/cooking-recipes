const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { checkUser } = require("./middleware/authMiddleware");

const app = express();
dotenv.config({ path: `${__dirname}/config/config.env` });

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");

//DB connection
const DB_user = process.env.DB_USER;
const DB_pass = process.env.DB_PASS;
const DB_name = process.env.DB_NAME;

const dbUri = `mongodb+srv://${DB_user}:${DB_pass}@cluster0.acdog.mongodb.net/${DB_name}`;
const port = process.env.PORT || 3000;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => console.error(err));

//routes
app.get("*", checkUser);

app.get("/", (req, res) => {
  res.locals.title = "Home";
  res.render("home");
});

app.get("/verification", (req, res) => {
  res.render("verification");
})

app.use(recipeRoutes);
app.use(userRoutes);
