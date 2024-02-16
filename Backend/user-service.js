const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

let mongoDBConnectionString = process.env.MONGO_URL,
  Schema = mongoose.Schema,
  userSchema = new Schema({
    userName: {
      type: String,
      unique: true,
    },
    password: String,
    favourites: [String],
    history: [String],
  }),
  User;

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(mongoDBConnectionString);

    db.on("error", (err) => reject(err));

    db.once("open", () => {
      console.log("Connected to MongoDB!");
      User = db.model("users", userSchema);
      resolve();
    });
  });
};

module.exports.registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    if (userData.password != userData.password2)
      reject("Passwords do not match");
    else {
      bcrypt
        .hash(userData.password, 10)
        .then((hash) => {
          userData.password = hash;

          let newUser = new User(userData);

          newUser
            .save()
            .then(() =>
              resolve("User " + userData.userName + " successfully registered")
            )
            .catch((err) => {
              if (err.code == 11000) reject("Username is already taken");
              else reject("There was an error creating the user: " + err);
            });
        })
        .catch((err) => reject(err));
    }
  });
};

module.exports.checkUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userName: userData.userName })
      .exec()
      .then((user) => {
        bcrypt.compare(userData.password, user.password).then((res) => {
          if (res === true) resolve(user);
          else reject("Incorrect password for the user " + userData.userName);
        });
      })
      .catch((err) => reject("Unable to find the user " + userData.userName));
  });
};

module.exports.getFavourites = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => resolve(user.favourites))
      .catch((err) =>
        reject(`Unable to get favourites for ${user.userName} with id: ${id}`)
      );
  });
};

module.exports.addFavourite = (id, favId) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => {
        if (user.favourites.length < 50) {
          User.findByIdAndUpdate(
            id,
            { $addToSet: { favourites: favId } },
            { new: true }
          )
            .exec()
            .then((user) => resolve(user.favourites))
            .catch((err) =>
              reject(
                `Unable to update favourites for ${user.userName} with id: ${id}`
              )
            );
        } else
          reject(
            `Unable to update favourites for ${user.userName} with id: ${id}`
          );
      });
  });
};

module.exports.removeFavourite = (id, favId) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { $pull: { favourites: favId } }, { new: true })
      .exec()
      .then((user) => resolve(user.favourites))
      .catch((err) =>
        reject(
          `Unable to update favourites for ${user.userName} with id: ${id}`
        )
      );
  });
};

module.exports.getHistory = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => resolve(user.history))
      .catch((err) =>
        reject(`Unable to get history for ${user.userName} with id: ${id}`)
      );
  });
};

module.exports.addHistory = (id, historyId) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => {
        if (user.favourites.length < 50) {
          User.findByIdAndUpdate(
            id,
            { $addToSet: { history: historyId } },
            { new: true }
          )
            .exec()
            .then((user) => resolve(user.history))
            .catch((err) =>
              reject(
                `Unable to update history for ${user.userName} with id: ${id}`
              )
            );
        } else
          reject(
            `Unable to update history for ${user.userName} with id: ${id}`
          );
      });
  });
};

module.exports.removeHistory = (id, historyId) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { $pull: { history: historyId } }, { new: true })
      .exec()
      .then((user) => resolve(user.history))
      .catch((err) =>
        reject(`Unable to update history for ${user.userName} with id: ${id}`)
      );
  });
};
