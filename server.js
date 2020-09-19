const path = require("path");
const express = require("express");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 5000;
var distDir = __dirname + "/build/";

app.use(compression());
app.use(express.static(distDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
