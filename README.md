## Project directory

- client: A single page app react project, built using `react-router-dom` for routing and `Vite` as the build tool.
- server: A node.js server using `express`, various middleware (`body-parser`, `cookie-parser`), and `jsonwebtoken` to create and parse JWT tokens used for authentication.

***************************************************************************
***************************************************************************

## Running the project (Local)

**Run the Vite bundler**

```sh
cd client
npm install
npm run dev
```

**Run the server in watch mode (nodemon)**

```sh
cd server
npm i -g nodemon
npm install
npm run watch
```

***************************************************************************

## Running the project (using Docker)

```sh
docker build -t app .
docker run -dp 8080:8080 app
```

***************************************************************************
***************************************************************************

Tailwind CSS used for styling.
