import http from "node:http";

const server = http.createServer((request, response) => {
  const url = request;
  if (url === "/") {
    response.write("<h2>Home Page</h2>");
  } else if (url === "/contacts") {
    response.write("<h2>Contacts Page</h2>");
  } else {
    response.write("<h2>Not found</h2>");
  }
  response.end();
});

server.listen(3000, () => {
  console.log("Server is running!");
});
