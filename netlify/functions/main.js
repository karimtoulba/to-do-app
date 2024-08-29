let { MongoClient } = require("mongodb");
let sanitizeHTML = require("sanitize-html");

// Sanitize HTML
function cleanUp(x) {
  return sanitizeHTML(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

// Secure environment
const handler = async (event) => {
  let body = JSON.parse(event.body);
  let task = cleanUp(body.task);

  let client = new MongoClient(process.env.DBCONNECT);
  await client.connect(); // Connect to DB

  let db = client.db();
  await db.collection("todoTasks").insertOne({ text: task }); // Insert into DB

  await client.close(); // Close DB connection

  if (body.task) {
    return {
      statusCode: 200, // False
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 200, // False
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false }),
    };
  }
};

module.exports = { handler };
