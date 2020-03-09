const express = require("express");
const cors = require("cors");
const stream = require("./stream");
const roomRouter = require("./rooms/router");
const Room = require("./rooms/model");

const logingRouter = require("./auth/router");
const userRouter = require("./user/router");

const app = express();
const port = process.env.PORT || 4000;

//using cors
const corsMiddleware = cors();
app.use(corsMiddleware);

//using bodyparser from express
const parser = express.json();
app.use(parser);

// using jwt
app.use(logingRouter);

//routers for endpoints
app.use(userRouter);

app.use(roomRouter);

app.get("/stream", async (request, response) => {
  stream.init(request, response);
  try {
    const allRooms = await Room.findAll();
    const roomAction = {
      type: "ALL_ROOMS",
      payload: allRooms
    };
    stream.send(roomAction);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log(`Listening on :${port}`));
