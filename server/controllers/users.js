var User = require("../models/User");
var Meetup = require("../models/Meetup");
var Thread = require("../models/Thread");
var Post = require("../models/Post");
var Category = require("../models/Category");
var bcrypt = require("bcrypt");
var passport = require("passport");

exports.getUsers = async (req, res) => {
  try {
    var users = await User.find().exec();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.register = (req, res) => {
  const {
    username,
    name,
    email,
    avatar,
    infos,
    password,
    passwordConfirmation,
  } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .json({ message: "Provide an email and a password." });

  if (password !== passwordConfirmation)
    return res.status(422).json({ message: "Password doesn't match." });

  User.findOne({ email }).exec(function(err, user) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    if (user) return res.status(409).json({ message: "User already exists." });

    user = new User({
      username,
      name,
      email,
      avatar,
      infos,
      password,
      passwordConfirmation,
    });

    user.save();

    return res.status(201).send({
      success: true,
      user: user.toObject(),
      message: "New user is successfully registered.",
    });
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .json({ message: "Provide an email and a password." });

  let user = User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "User does not exist." });
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({ message: "Wrong password." });
  }

  return passport.authenticate("local", (err, passportUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong." });
      return;
    }

    if (!passportUser) {
      res.status(401).json(failureDetails);
      return;
    }

    // req.login is a Passport method that calls "serializeUser()"
    // (that saves the USER ID in the session)
    req.login(passportUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong." });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne(req.user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Session destroyed." });
};

function fetchMeetupsByUserQuery(userId) {
  return Meetup.aggregate([
    {
      $facet: {
        meetups: [
          { $match: { meetupCreator: userId } },
          { $limit: 5 },
          { $sort: { createdAt: -1 } },
        ],
        meetupsCount: [
          { $match: { meetupCreator: userId } },
          { $count: "count" },
        ],
      },
    },
  ])
    .exec()
    .then((results) => {
      return new Promise((resolve, reject) => {
        Category.populate(results[0].meetups, { path: "category" }).then(
          (pMeetups) => {
            if (pMeetups && pMeetups.length > 0) {
              resolve({
                data: pMeetups,
                count: results[0].meetupsCount[0].count,
              });
            } else {
              resolve({ data: results[0].meetups, count: 0 });
            }
          }
        );
      });
    });
}

function fetchThreadsByUserQuery(userId) {
  return Thread.aggregate([
    {
      $facet: {
        threads: [
          { $match: { user: userId } },
          { $limit: 5 },
          { $sort: { createdAt: -1 } },
        ],
        threadsCount: [{ $match: { user: userId } }, { $count: "count" }],
      },
    },
  ])
    .exec()
    .then((results) => {
      const threads = results[0].threads;
      if (threads && threads.length > 0) {
        return { data: threads, count: results[0].threadsCount[0].count };
      }

      return { data: threads, count: 0 };
    });
}

function fetchPostByUserQuery(userId) {
  return Post.aggregate([
    {
      $facet: {
        posts: [
          { $match: { user: userId } },
          { $limit: 5 },
          { $sort: { createdAt: -1 } },
        ],
        postsCount: [{ $match: { user: userId } }, { $count: "count" }],
      },
    },
  ])
    .exec()
    .then((results) => {
      const posts = results[0].posts;
      if (posts && posts.length > 0) {
        return {
          data: results[0].posts,
          count: results[0].postsCount[0].count,
        };
      }

      return { data: results[0].posts, count: 0 };
    });
}

exports.getUserActivity = function(req, res) {
  const userId = req.user._id;

  Promise.all([
    fetchMeetupsByUserQuery(userId),
    fetchThreadsByUserQuery(userId),
    fetchPostByUserQuery(userId),
  ])
    // Writing [] to get data from the array
    .then(([meetups, threads, posts]) => res.json({ meetups, threads, posts }))
    .catch((err) => {
      console.log(err);
      res.status(422).send({ err });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const user = req.user;

  if (user.id === userId) {
    // new: bool - true to return the modified document rather than the original. defaults to false
    User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true },
      (errors, updatedUser) => {
        if (errors) return res.status(422).send({ errors });
        return res.json(updatedUser);
      }
    );
  } else {
    return res.status(422).send({ errors: "Authorization Error!" });
  }
};
