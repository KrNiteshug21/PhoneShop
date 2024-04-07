const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logFileName) => {
  const datetime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${datetime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "log"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "log"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "log", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method}\t${req.url}`);
  next();
};

module.exports = { logEvents, logger };
