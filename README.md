# Rome
### A simple asset server

Rome enables users to store and retrieve assets through a simple API.

###Setting up on OSX

###Install NPM & Node
````
Coming soon
````

####Install & run MongoDB

```
brew install mongodb
mongod --fork --config /usr/local/etc/mongod.conf
```

####Install Rome

```
git clone git@github.com:146BC/Rome.git rome
cd rome
npm install
node app.js
```
For security reasons Rome requires every request to contain a valid API Key, on first launch the server will output the master API Key.

```
Created master API Key: fbdc5668-c02f-456d-9e8f-6d02fb8ef490
```
The API Key is sent as a header "api_key" with every request.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6062e9e88e049f8ec814#?env%5BRome-Dev%5D=W3sidHlwZSI6InRleHQiLCJlbmFibGVkIjp0cnVlLCJrZXkiOiJyb21lLXVybCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn1d)
