require("express-async-errors");
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

// middleware
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Sore api</h1>");
});

app.use("/api/v1/products", productRouter);

// products routes
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server is listening on port ${port}.....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
