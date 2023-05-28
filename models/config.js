const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL, { useNewUrlParser: true })
  .then((data) => {
    console.log(`MongoDb successfully connected to ${data.connection.name}`);
  })
  .catch((err) => {
    console.log(`Error occur ${err.message}`);
  });
