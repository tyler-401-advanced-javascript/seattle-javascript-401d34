# Authentication!!
## Definition
Authentication means proving (in this case, to a web server) that you are who you say you are. Why is this important?
- So that we can restrict information based on identities
- So that we can restrict editing or deleting that information
- We can ensure that one person can't impersonate another
How does this generally work? Generally you need some kind of **user account system**. This is a system that enables you to sign up, and have some kind of persistent record of who you are, what you can do, what you have access to, and when/under what circumstances.

In general, servers have a `POST` route to some endpoint like `/signup` that enables users to create an account. This route will be (generally speaking) unprotected, so that a user from outside the system will be able to POST to it and create themselves an account.

If we were to make a model of a user account, what attributes would it have?
- Username
- Real name
- Email address
- Password
Stuff like that.

Let's talk about **passwords**. The password is your credential: it's supposed to be secret, and it's supposed to be some way that only you know to prove your identity. Right away we've gotten into a few big problems.
1. Passwords can be hard to remember. What happens if you forget it?
2. How do you transport the password from the client to the server? This is a problem because anyone spying on your network can pick up any information that's publicly transmitted on it.
3. The server has to store the password somehow. What if it gets hacked or stolen?

### Hashing
So what do we do with the password on the server's end? We encrypt it and store the encrypted version. This is often done with **hash functions**. A hash function is a "one-way" function, meaning that you put in some text and get back a string of gibberish according to some predictable algorithm, and every time you hash the same text, you get the same result. A well-designed hash algorithm also means that when you enter a slight change to the text, you get a big difference in the hash value.

An example of a well-known hash function is SHA256:
```
$ echo "Gotta catch 'em all\!" | openssl sha256
4be38e2afd9e850c45545dc76988e6caae1c64f3d22cdd2f9d2a728c5f92b228
```
Changing the exclamation point to a period gives a completely different 256-bit number:
```
$ echo "Gotta catch 'em all." | openssl sha256
554425fc1d25e337c0da5792d45ecd27428a192db41c14778a8e190643011cb3
```
And if you do the same thing twice, you're guaranteed to get the same result:
```
$ echo "Gotta catch 'em all." | openssl sha256
554425fc1d25e337c0da5792d45ecd27428a192db41c14778a8e190643011cb3
```
The principle of reusability is what makes hash functions useful. This means that when a user types in their password, it will always hash to the same value, and we need only store the hashed value and compare that to whatever they typed in. Since we can't reconstruct the password from the hashed value, this is (theoretically) secure.

### How do we use this?
We create a server with a `POST` route to `/signup`, the user sends some data to create a username and password, and then the server saves the hash of the password to its database, and compares that hash to the hashed value of the user's password every time the user enters the password.

## Basic Authentication ("Basic Auth")
1. Basic Auth sends a (poorly) encrypted string in an HTTP header of the format `username:password`
2. The server then parses that and attempts to confirm that your username and password are both in the system and correct
3. For password validation, the system needs to encrypt what you gave as a password at sign-in, and see if it matches the encrypted password we actually saved
4. Once you are considered to be "logged in", the server can then transfer you to a more secure type of authentication. In this class, we'll be using a type of authentication called JWT (JsonWebToken), which is more secure than Basic Auth.

## Encryption with `bcrypt`
`bcrypt` is a password hashing function that is implemented as a library and available on npm.
