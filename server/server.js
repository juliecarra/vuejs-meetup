// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

const dbConfig = require("./config/");

// Store sessions in MongoDB
const store = new MongoDBStore({
  uri: dbConfig.MONGO_URI,
  collection: "meetupSession",
});

// Catch errors
store.on("error", function(error) {
  console.log(error);
});

// Connect to MongoDB
mongoose
  .connect(dbConfig.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to MongoDB! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB", error);
  });

// Defining port
const port = process.env.PORT || 9000;

// Defining app
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { pingTimeout: 60000 });

require("./socket")(io);

// Defining middlewares
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: dbConfig.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Defining the Routes
app.use("/api/meetups", require("./routes/meetups"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/threads", require("./routes/threads"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/ip", require("./routes/api"));

require("./services/passport");

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "dist");
  app.use(express.static(appPath));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

// Listening to port
server.listen(port);
console.log(`Listening On http://localhost:${port}/`);
