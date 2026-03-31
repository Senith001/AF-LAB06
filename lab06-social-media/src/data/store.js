let users = [
  { id: 1, username: "Senith", password: "1234" },
  { id: 2, username: "Pasindu", password: "1111" },
  { id: 3, username: "Sandeepa", password: "2222" }
];

let posts = [
  {
    id: 1,
    title: "Senith's Post",
    content: "Senith's 1st post",
    author: "Senith",
    userId: 1,
    image: null
  },
  {
    id: 2,
    title: "Pasindu's Post",
    content: "Pasindu's 1st post",
    author: "Pasindu",
    userId: 2,
    image: null
  },
  {
    id: 3,
    title: "Sandeepa's Post",
    content: "Sandeepa's 1st post",
    author: "Sandeepa",
    userId: 3,
    image: null
  }
];

module.exports = {
  users,
  posts
};