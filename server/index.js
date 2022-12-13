const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./api");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const allowlist = ["http://localhost:3000"];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cookieParser());

// Use the body-parser middleware to parse various request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

// attach the router to the app
app.use("/api", cors(corsOptionsDelegate), router);

// Listen for requests
const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});
