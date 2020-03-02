# Bearer Authentication
What are these tokens we keep generating? What are they actually for?

The basic question here is: How should we best handle every request to our server or API?
- What if we used Basic Authentication for every route call?
  - Pros: Simple to use (have them just send a header with their username and password on every request), implementation is pretty simple, and pretty fast (all you have to do is have the server check "is this person legit?")
  - Cons: You're sending your password all over the place, not super secure
- What if we used OAuth for every route call?
  - Pros: Much more secure, user doesn't have to keep coming up with different usernames/passwords for their sites and forgetting them
  - Cons: Very expensive time-wise: constant validation, constant handshaking with a third-party server, and your app's availability is now at the mercy of that third-party server

We want all these pros: speed, security, and flexibility in the routes, as well as ease of implementation. We can get this through **bearer authentication**.
## How does bearer auth work?
1. After a successful initial login (using Basic Auth, or OAuth, or something else), the server gives a signed token to the client.
2. The client returns the same token to the server on every subsequent request.
3. The server can then grant or deny access based on the validity of the token and the user who's sending it.

 For point (1): the client needs to store the token somewhere. Some possibilities are:
 - LocalStorage
 - Session storage
 - Cookies
 - What if the client is another server? Maybe a database or a `.env` file

 For point (3): the server has to do **server-side validation** of the token to make sure that it's correct.
 - Is the secret key correct?
 - Decode the token from Base64
 - Inspect the JSON object
   - What did we put in there?
   - ID
   - Username
   - Etc.
- Find the user in our local database of users, and make sure the user is still valid. Why? Because between requests, the user might cease to exist or be inactivated, or have its privileges changed.
