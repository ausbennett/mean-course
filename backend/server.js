//      THIS FILE IS BASICALLY LIKE A SERVER CONFIG FILE, IT JUST HOSTS NODE JS SERVER AND THEN THE EXPRESS APP WHERE THE ACTUALL LOGIC IS './APP.JS'
//      THIS JUST HAS SOME TROUBLE SHOOTING FUNCTIONS

const app = require("./app");
const debug = require("debug")("node-angular"); //for nodemon (node monitor)
const http = require("http");

//elaborate port function to make sure port is valud
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};


//log & exit gracefully when an error occurs
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//log that we are listenting to requets
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

//setting our port with help of the above mentioned function
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);


const server = http.createServer(app);
server.on("error", onError); //error listener
server.on("listening", onListening); //listening
server.listen(port); //start the server