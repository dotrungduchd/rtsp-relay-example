const express = require("express");
const app = express();
const path = require("path");
require("events").EventEmitter.prototype._maxListeners = 100;

const { proxy } = require("rtsp-relay")(app);

const handler = proxy({
  url: `rtsp://user:pass@cameraip:port/some_path`,
  transport: "tcp",
});

app.ws("/api/stream", handler);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client.html"));
});

app.use(express.static(path.join(__dirname, "./")));

app.listen(9999);
