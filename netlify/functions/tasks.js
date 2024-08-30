let { MongoClient } = require("mongodb");

// Secure environment
const handler = async () => {
  let client = new MongoClient(process.env.DBCONNECT);

  // Connect to Database & Fetch tasks
  await client.connect();
  const tasks = await client.db().collection("todoTasks").find().toArray();
  await client.close();

  // Server Side Rendering
  //   let tasksFind = tasks
  //     .map((task) => {
  //       return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  //           <span class="item-text">${task.text}</span>
  //           <div>
  //             <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
  //             <button class="delete-me btn btn-danger btn-sm">Delete</button>
  //           </div>
  //         </li>`;
  //     })
  //     .join("");

  // Return to Public
  return {
    statusCode: 200, // Success
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ tasks: tasks }),
  };
};

module.exports = { handler };
