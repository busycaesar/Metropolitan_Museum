// Importing all the requirements.
const express = require("express"),
  app = express(),
  cors = require("cors"),
  dotenv = require("dotenv").config(),
  userService = require("./user-service.js"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  passportJWT = require("passport-jwt"),
  HTTP_PORT = process.env.PORT || 8080;

// Declaring all the JWT requirements.
let ExtractJWT = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy,
  jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET,
  },
  strategy = new JwtStrategy(jwtOptions, (jwtPayLoad, next) => {
    if (jwtPayLoad) {
      next(null, {
        _id: jwtPayLoad._id,
        userName: jwtPayLoad.userName,
      });
    } else next(null, false);
  });

// Middlewares.
app.use(express.json());
app.use(cors());
passport.use(strategy);
app.use(passport.initialize());

// Routes.

// To register a new user.
app.post("/api/user/register", (req, res) => {
  userService
    .registerUser(req.body)
    .then((msg) => res.json({ message: msg }))
    .catch((msg) => res.status(422).json({ message: msg }));
});

// For authenticating an old user and passing the JWT.
app.post("/api/user/login", (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      let payLoad = { _id: user._id, userName: user.userName },
        token = jwt.sign(payLoad, jwtOptions.secretOrKey);
      res.json({ message: "login successful", token: token });
    })
    .catch((msg) => res.status(422).json({ message: msg }));
});

// For returning the list of all the favourite items.
app.get(
  "/api/user/favourites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .getFavourites(req.user._id)
      .then((data) => res.json(data))
      .catch((msg) => res.status(422).json({ error: msg }));
  }
);

// For adding a new favourtie item.
app.put(
  "/api/user/favourites/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .addFavourite(req.user._id, req.params.id)
      .then((data) => res.json(data))
      .catch((msg) => res.status(422).json({ error: msg }));
  }
);

// For deleting a favourite item from the list.
app.delete(
  "/api/user/favourites/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .removeFavourite(req.user._id, req.params.id)
      .then((data) => res.json(data))
      .catch((msg) => res.status(422).json({ error: msg }));
  }
);

// For returning the list of search history query.
app.get(
  "/api/user/history",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .getHistory(req.user._id)
      .then((data) => res.json(data))
      .catch((msg) => res.status(422).json({ error: msg }));
  }
);

// For adding a new search history.
app.put(
  "/api/user/history/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .addHistory(req.user._id, req.params.id)
      .then((data) => res.json(data))
      .catch((msg) => res.status(422).json({ error: msg }));
  }
);

// For deleting a search history.
app.delete(
  "/api/user/history/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .removeHistory(req.user._id, req.params.id)
      .then((data) => res.json(data))
      .catch((msg) => res.status(422).json({ error: msg }));
  }
);

// Starting the server upon connecting with the mongoDB.
userService
  .connect()
  .then(() =>
    app.listen(HTTP_PORT, () => {
      console.log("API listening on: " + HTTP_PORT);
    })
  )
  .catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
  });
