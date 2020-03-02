const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  `mongodb+srv://rronjakupi:` +
    process.env.MONGO_ATLASS_PW +
    `@news-feed-jmtwq.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(morgan("dev"));

const postRoutes = require("./api/routes/post");
const userRoutes = require("./api/routes/user");
const categoryRoutes = require("./api/routes/category");
const teknologjiRoutes = require("./api/routes/postsByCategories/teknologji");
const ekonomiRoutes = require("./api/routes/postsByCategories/ekonomi");
const sportRoutes = require("./api/routes/postsByCategories/sport");
const kulturaRoutes = require("./api/routes/postsByCategories/kultura");
const shendetesiRoutes = require("./api/routes/postsByCategories/shendetesi");
const funRoutes = require("./api/routes/postsByCategories/fun");
const autoRoutes = require("./api/routes/postsByCategories/auto");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/teknologji", teknologjiRoutes);
app.use("/ekonomi", ekonomiRoutes);
app.use("/sport", sportRoutes);
app.use("/kultura", kulturaRoutes);
app.use("/shendetesi", shendetesiRoutes);
app.use("/fun", funRoutes);
app.use("/auto", autoRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = app;
