var Thread = require("../models/Thread");

exports.getThreads = function(req, res) {
  const meetupId = req.query.meetupId;
  const pageSize = req.query.pageSize || 5;
  const pageNum = req.query.pageNum || 1;

  const skips = pageSize * (pageNum - 1);

  Thread.find({})
    .where({ meetup: meetupId })
    .skip(parseInt(skips))
    .limit(parseInt(pageSize) + 1)
    .sort({ createdAt: -1 })
    .populate({
      path: "posts",
      options: { limit: 5, sort: { createdAt: -1 } },
      populate: { path: "user" },
    })
    .exec((err, threads) => {
      if (err) {
        return res.status(422).send({ err });
      }

      let isAllDataLoaded = false;
      if (threads.length <= 5) {
        isAllDataLoaded = true;
      }

      return res
        .status(200)
        .json({ threads: threads.splice(0, 5), isAllDataLoaded });
    });
};

exports.createThread = (req, res) => {
  const threadData = req.body;
  const thread = new Thread(threadData);
  thread.user = req.user;

  thread.save((err, createdThread) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.status(200).json(createdThread);
  });
};
