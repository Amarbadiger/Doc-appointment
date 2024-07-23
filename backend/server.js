const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();
// for both port running
app.use(cors());
// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", require("./routes/userRoute"));
// Admin Routes
app.use("/api/v1/admin", require("./routes/AdminRoute"));
// Doctor Routes
app.use("/api/v1/doctor", require("./routes/doctorRoute"));

// port
const port = process.env.PORT || 8080;
// listen port
app.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
