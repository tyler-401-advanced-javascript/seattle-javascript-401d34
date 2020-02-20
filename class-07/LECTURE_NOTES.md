# HTTP, CRUD, and REST
- HTTP: "HyperText Transfer Protocol": "HyperText" refers to the fact that you can have links between one document and another.
- CRUD: "Create, Read, Update, Destroy/Delete": these are operations on data
- REST: "Representational State Transfer": an architecture for performing CRUD operations over HTTP.

HTTP is a **stateless** architecture. What does "stateless" mean? It means that every interaction between client and server over HTTP knows nothing about what came before it or what comes after it. Everything that happens over HTTP is unique to that one HTTP request.

REST is an architecture for using HTTP to do CRUD operations. The issue here is that CRUD is **stateful**: a CRUD operation can modify things, meaning that future CRUD operations will return different data.

HTTP has what we call the request/response cycle. The client makes a request, and the server responds with a response. The response has two pieces: the headers and the body. The headers include status, version, and other metadata about the response; the body is the business ends of things. Headers are public information: anyone on the network can read them. This is comparable to the outside of an envelope of a piece of mail: it describes who it's sent to, where it's coming from, how much postage was paid, etc. The body of the message is equivalent to the piece of mail inside the envelope. It's not supposed to be public, but you should treat it as if it is. People open each other's mail. If you're doing anything secure, you need to use encryption—we'll get to encryption later in the course.

HTTP has [multiple methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) that map onto CRUD operations:
- HTTP **GET** maps to CRUD **read**
- HTTP **PUT** maps to CRUD **update**
- HTTP **POST** maps to CRUD **create**
- HTTP **DELETE** maps to CRUD **destroy**
You'll make 95% of your money in these four HTTP verbs. Also you may from time to time encounter the following HTTP verbs:
- HTTP **PATCH** maps to CRUD **update** (the difference between PUT and PATCH is pretty fuzzy; technically PUT is supposed to replace the entire object while PATCH is only supposed to replace the pieces of that object you care about. In practice people tend to use PUT and PATCH more or less interchangeably. I recommend staying away from PATCH entirely.)
- HTTP **TRACE** is supposed to send the requested input back to the user. This is used for debugging.
- HTTP **HEAD** acts like a regular response but sends back no data in the body, only a header.
- HTTP **OPTIONS** is supposed to describe the communication options for the specified resource.

The HTTP method describes what action you want to perform with the data, and the body of the request describes the data itself.
- HTTP GET asks to read a resource. We don't need our request to have a body, because the verb GET asks for everything we need.
- HTTP POST asks to create a new resource. The body of the POST request will describe the new resource to be created.
- HTTP PUT asks to edit a resource. The body of the PUT request will describe the resource to replace the one to be edited.
- HTTP DELETE asks to delete a resource. We don't need our request to have a body, because the verb DELETE asks for everything we need.

## HTTP Statuses
The status code is a 3-digit number that is returned with every HTTP response. The code tells you, briefly, what happened.
- Errors starting with 2XX: success
- Errors starting with 3XX: something moved or isn't where you expected it to be
- Errors starting with 4XX: you (the client) gave me (the server) a bad request and I couldn't fulfill it
- Errors starting with 5XX: I (the server) have something wrong with me and I can't fulfill your request

## HTTP and REST with Express
Express is a Node library for building APIs. **API** stands for Application Programming Interface. Basically this is a fancy way of saying "defined way to access and edit data". The HTTP API has the verbs we've seen above: GET, POST, etc.: Express allows us to build a server that listens to various **routes** and for various **verbs** and then it does stuff with the requested data.
