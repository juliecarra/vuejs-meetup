const moment = require("moment");
const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const meetup1Id = mongoose.Types.ObjectId();
const meetup2Id = mongoose.Types.ObjectId();
const meetup3Id = mongoose.Types.ObjectId();
const meetup4Id = mongoose.Types.ObjectId();
const meetup5Id = mongoose.Types.ObjectId();
const meetup6Id = mongoose.Types.ObjectId();

const thread1Id = mongoose.Types.ObjectId();
const thread2Id = mongoose.Types.ObjectId();
const thread3Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post2Id = mongoose.Types.ObjectId();
const post3Id = mongoose.Types.ObjectId();
const post4Id = mongoose.Types.ObjectId();
const post5Id = mongoose.Types.ObjectId();

const category1Id = mongoose.Types.ObjectId();
const category2Id = mongoose.Types.ObjectId();
const category3Id = mongoose.Types.ObjectId();
const category4Id = mongoose.Types.ObjectId();
const category5Id = mongoose.Types.ObjectId();

module.exports = {
  meetups: [
    {
      _id: meetup1Id,
      location: "Paris, FR",
      processedLocation: "parisfr",
      title: "Club Paris Golf",
      image:
        "https://images.unsplash.com/photo-1562204320-31975a5e09ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=730&q=80",
      description:
        "This group is for everyone who wants to discover or play golf regularly. It's also a great opportunity to make new friends.",
      shortInfo: "courses for all levels.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(2, "days")
        .toISOString(),
      timeFrom: "14:00",
      timeTo: "18:00",
      joinedPeopleCount: 1,
      status: "active",
      category: category1Id,
      joinedPeople: [user2Id],
      meetupCreator: user1Id,
    },
    {
      _id: meetup2Id,
      location: "Brooklyn, NY",
      processedLocation: "brooklynny",
      title: "Brooklyn Salsa Meetup",
      image:
        "https://images.unsplash.com/photo-1522083043120-6f9d458f6cbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80",
      description:
        "Create a community of people who love to dance Salsa. Also a great way to meet new and interesting people.",
      shortInfo: "Dance classes.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(3, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category4Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id,
    },
    {
      _id: meetup3Id,
      location: "Lisbon, PT",
      processedLocation: "lisbonpt",
      title: "Portuguese Baroque Music",
      image:
        "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      description:
        "The focus will be on music that is somehow linked to the Portuguese language, heritage or culture, but that’s not an absolute limitation.",
      shortInfo: "Learn about 16th and 17th century music.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(4, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category3Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id,
    },
    {
      _id: meetup4Id,
      location: "Los Angeles, US",
      processedLocation: "losangelesus",
      title: "Premiere of Bad Boys For Life",
      image: "https://www.cgrcinemas.fr/troyes/evenement/BBFL_ICEImmersive.jpg",
      description:
        "Lets watch the new Bad Boy movie together and get the chance to meet the stars of the movie.",
      shortInfo: "Premiere with Will Smith and Martin Lawrence.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(5, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category2Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id,
    },
    {
      _id: meetup5Id,
      location: "London, UK",
      processedLocation: "londonuk",
      title: "London NightLife",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      description:
        "We start our evenings with pre-party networking in order to meet and know each other and then we enjoy the party together .",
      shortInfo: "Come as you are.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(6, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category5Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id,
    },
    {
      _id: meetup6Id,
      location: "Rio de Janeiro, BR",
      processedLocation: "riodejaneirobr",
      title: "Rio de Janeiro National Football League Meetup",
      image:
        "https://images.unsplash.com/photo-1512144253214-d94e86cd9189?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description:
        "Let's come together during this NFL football season and rejoice.",
      shortInfo: "For football fans.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(7, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category1Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id,
    },
  ],
  users: [
    {
      _id: user1Id,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQSxpTIbHVATSz4WS1wuBQ_xIidoGmApKy0H5HjBgd8DWPTWigL&usqp=CAU",
      email: "james.fox@gmail.com",
      name: "James Fox",
      info: "Bla bla bla bla",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      username: "James",
      password: "azerty",
      joinedMeetups: [meetup2Id, meetup3Id, meetup4Id, meetup5Id, meetup6Id],
    },
    {
      _id: user2Id,
      avatar:
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg",
      email: "bilal.abbas@gmail.com",
      name: "Bilal Abbas",
      info: "Bla bla bla bla",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      username: "Bilal",
      password: "azerty",
      joinedMeetups: [meetup1Id],
    },
    {
      _id: user3Id,
      avatar:
        "https://image.freepik.com/free-vector/woman-girl-female-cartoon-avatar-icon_25030-13347.jpg",
      email: "anna.bell@gmail.com",
      name: "Anna Bell",
      info: "I have a famous name",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      username: "Anna",
      password: "azerty",
      joinedMeetups: [meetup2Id, meetup3Id, meetup4Id, meetup5Id, meetup6Id],
    },
  ],
  threads: [
    {
      _id: thread1Id,
      title: "Should I bring my own clubs?",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup1Id,
      user: user1Id,
      posts: [post1Id, post2Id],
    },
    {
      _id: thread2Id,
      title: "Can we come if we are beginners?",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup2Id,
      user: user2Id,
      posts: [post3Id, post4Id],
    },
    {
      _id: thread3Id,
      title: "Last minute information",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup2Id,
      user: user2Id,
      posts: [post5Id],
    },
  ],
  posts: [
    {
      _id: post1Id,
      text: "You can bring them but it is not mandatory.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread1Id,
      user: user1Id,
    },
    {
      _id: post2Id,
      text: "Good question.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread1Id,
      user: user1Id,
    },
    {
      _id: post3Id,
      text: "Of course you can! ",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread2Id,
      user: user2Id,
    },
    {
      _id: post4Id,
      text: "I can't wait to meet you all.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread2Id,
      user: user2Id,
    },
    {
      _id: post5Id,
      text: "I'll be 10minutes late.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread3Id,
      user: user2Id,
    },
  ],
  categories: [
    {
      _id: category1Id,
      name: "sport",
      image:
        "https://images.unsplash.com/photo-1519611103964-90f61a50d3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=748&q=80",
    },
    {
      _id: category2Id,
      name: "cinema",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      image2:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      image3:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    },
    {
      _id: category3Id,
      name: "music",
      image:
        "https://images.unsplash.com/photo-1547156979-b57c6439f9d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
      _id: category4Id,
      name: "dance",
      image:
        "https://images.unsplash.com/photo-1509670811615-bb8b07cb3caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80",
    },
    {
      _id: category5Id,
      name: "party",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    },
    {
      _id: mongoose.Types.ObjectId(),
      name: "literature",
      image:
        "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
    },
    {
      _id: mongoose.Types.ObjectId(),
      name: "food",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=793&q=80",
    },
    {
      _id: mongoose.Types.ObjectId(),
      name: "games",
      image:
        "https://images.unsplash.com/photo-1581591546163-a6e9bf7ce12d?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
  ],
};
