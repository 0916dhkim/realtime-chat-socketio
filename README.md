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

## How to Run E2E Tests

1. Seed the database with `npm seed` in `client` directory.
1. Start the backend server with `npm dev` in `server` directory.
1. Start the frontend server with `npm start` in `server` directory.
1. Open Cypress dashboard with `npx cypress open` in `client` directory.
1. Click on the test suite to run (e.g. `auth.spec.js`).

#### Notes

- You need to seed the database before each run. Because E2E test cases writes data to
  the actual database, re-seeding is necessary to assure consistent test results.
- When you push your changes to GitHub, E2E tests are automatically executed on GitHub Actions.
  You can find test results under Pull request > Checks > test > Cypress (see screenshots below).

![image](https://user-images.githubusercontent.com/8978815/136117299-b45a61ce-0b5c-495f-b572-05ad80b78a28.png)
![image](https://user-images.githubusercontent.com/8978815/136119935-4b941f87-0015-48c5-b93e-5bd0bcbbd64b.png)
