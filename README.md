# Structure Template NodeJS

generate token string : node helpers/RandomString.js

The structure template NodeJS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you install this in your workspace.

```
1. NodeJS LTS Version (recommended v10.15.x)
2. NPM (recommended v6.9.x)
2. Git (recommended v2.22.x)
```

### Installing

Step by step for use this template to workspace.
```
1. git clone https://github.com/jokosu10/template-framework-express.git
2. cd template-framework-express
3. npm install
4. cp .env.example .env
5. set variable in .env
```

## Running the apps
Run this apps with command
```
nodemon app.js
```
If you want to run apps with docker, run this apps with command
```
1. docker build -t <username>/template-node-app .
2. docker run -p 49160:4000 -d <username>/template-node-app
```

## Running the tests

Run the automated tests for this system with command
```
npm run test
```

## Built With

* [Express JS](https://expressjs.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management

## Authors

* **Joko Susilo < jokosu10@opensuse.org >**

## License

This project is licensed under the MIT License.
