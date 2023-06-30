module.exports = {
  modelBaseDirectory: '../travlr/app_server/models/',
  models: ["*.js", "!db.js"], // model matcher
  data: "data", // data directory name
  db: "mongodb://localhost:27017/travlr", // db connection url
};
