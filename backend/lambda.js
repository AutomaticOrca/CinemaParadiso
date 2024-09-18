require("source-map-support/register");
const serverlessExpress = require("@codegenie/serverless-express");
const mongoose = require("mongoose");
const app = require("./app");

let serverlessExpressInstance;

async function connectToDatabase() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(
      "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/Paradiso",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  }
}

async function setup(event, context) {
  await connectToDatabase();

  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

function handler(event, context) {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }
  return setup(event, context);
}

exports.handler = handler;
