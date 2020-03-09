const Sequelize = require("sequelize");
const db = require("../db");

const Room = db.define(
  "room",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "rooms"
  }
);
module.exports = Room;
