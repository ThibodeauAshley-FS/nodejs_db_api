const http = require("http");
const connectDB = require("./app/db/config")
const app = require("./app/app");
require("dotenv").config();

connectDB();

http.createServer(app).listen(process.env.port  ||  3000,  () =>  console.log(`Server is running on port : ${process.env.port}`));
