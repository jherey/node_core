/*
 * Primary file for API
 *
 */

 // Dependencies
 const http = require('http');
 const url = require('url');
 const { StringDecoder } = require('string_decoder');

 const server = http.createServer(function(req, res) {
   // Get the url and parse it
   const parsedUrl = url.parse(req.url, true);

   // Get the path
   const path = parsedUrl.pathname;
   const trimmedPath = path.replace(/^\/+|\/+$/g, '');

   // Get the query string as an object
   const queryStringObject = parsedUrl.query;

   // Get the HTTP Method
   const method = req.method.toLowerCase();

   // Get the headers as an object
   const headers = req.headers;

   // Get the payload, if any
   const decoder = new StringDecoder('utf-8');
   let buffer = '';
   req.on('data', function(data) {
     buffer += decoder.write(data);
   });
   req.on('end', function() {
     buffer += decoder.end();

     // Send the response
     res.end('Hello World\n');
  
     const output = `
                    Request received on path: ${trimmedPath}
                    with method: ${method}
                    and with these query string parameters ${JSON.stringify(queryStringObject)}
                    with these headers ${headers}
                    `
  
     // Log the request path
    console.log(`Request received with these payload ${buffer}`);
   });
 });

 server.listen(3000, function() {
   console.log('The server is listening on port 3000');
 });