# Messenger

A one-to-one realtime chat app.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

## Running Application Locally

```
psql
CREATE  DATABASE messenger;
\q

cd server
npm install

// seed the database
npm run seed

npm run dev
```

Create a .env file in the server directory and add your session secret

```
SESSION_SECRET = "your session secret"
```
