const express = require("express");
const Room = require("./model");
const stream = require("../stream");

const { Router } = express;

const router = Router();

router.post("/room", async (request, response, next) => {
  try {
    const newRoom = await Room.create(request.body);
    response.send(newRoom);
    const action = {
      type: "NEW_ROOM",
      payload: response.body
    };
    stream.send(action);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
