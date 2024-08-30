let { MongoClient } = require("mongodb");

// Secure environment
const handler = async () => {
  let client = new MongoClient(process.env.DBCONNECT);

  await client.connect();
  const tasks = await client.db().collection("todoTasks").find().toArray();
  await client.close();

  // Server Side Rendering

  return {
    statusCode: 200, // Success
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ tasks: tasks }),
  };
};

module.exports = { handler };
