"use strict";
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const fs = require("fs");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

const PORT = 9090;
server.listen(PORT);
console.log("Server listening " + PORT);

const tinyconf = require("./tinyconf.js");

const grpcClientWrapper = require("./Wrapper/Wrapper.js");
const TA2PORT = "localhost:50054";

let datasets_path = "./static/local_testing_data";
let datasets = fs.readdirSync(datasets_path);
// console.log(typeof datasets);
// datasets.forEach(dataset => {
//   console.log(dataset);
// });

serverSocket.on("connection", socket => {
  console.log("Server: connected!");

  socket.on("getDatasetsReq", () => {
    console.log("getDatasetsReq");
    // console.log(datasets);
    socket.emit("getDatasetsRes", datasets);
    console.log("Emit getDatasetsRes");
  });

  socket.on("setDatasetReq", selected_dataset => {
    console.log(selected_dataset);
    try {
      var configPaths = [require.resolve("./tufts_gt_wisc_configuration.json")];
      //avoid require to read in json to avoid complications with caching at this point
      tinyconf(
        selected_dataset,
        "static/local_testing_data/",
        JSON.parse(fs.readFileSync(configPaths[0], "utf8")),
        configPaths
      );
    } catch (err) {
      console.log("no fallback config file found", err);
      tinyconf(process.argv, "static/local_testing_data/", {}, [
        "./tufts_gt_wisc_configuration.json"
      ]);
    }
  });

  socket.on("helloSearch", () => {
    grpcClientWrapper.connect();
    grpcClientWrapper.helloLoop().then(grpcClientWrapper.searchSolutions);
  });
});
