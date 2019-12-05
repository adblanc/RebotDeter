const Twit = require("twit");
const Streams = require("./streams");
const config = require("./config");

const T = new Twit(config);
const streams = new Streams(T);

module.exports = () => streams.listenForInternShips();
