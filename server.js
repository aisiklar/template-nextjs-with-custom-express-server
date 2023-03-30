const express = require("express");
const port = process.env.PORT || 5001;
const path = require("node:path");

// for deploying next
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    //const showRoutes = require("./routes/index.js");
    //server.use("/api", showRoutes(server));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
