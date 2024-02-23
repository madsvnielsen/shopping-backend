# shopping-backend
A backend for a shopping website

[Frontend project](https://github.com/madsvnielsen/shopping-frontend)

# Tech stack
* node.js 🟩
* Express 🌐
* Sequelize 🧩
* mySql db 🎁
* Apache web server



## How to run

Create a database that is supported by [Sequelize](https://sequelize.org/docs/v6/getting-started/).

Set up the environment as explained in the section [how to set up the environment](#environment-setup)


Ensure you have all dependencies installed with.
```bash
npm install
```



For development
```bash
npm run dev
```
Build to JavaScript
```bash
npm run build
```
## Environment setup

### Development
Create a `nodemon.js` file using the following format.
```json
{
  "env" : {
    "API_KEY" : "<PTCG API key>",
    "DB_HOST" : "<host>",
    "DB_NAME" : "<name>",
    "DB_USER" : "<username>",
    "DB_PASSWORD" : "<password>",
    "DB_DIALECT" : "<dialect>"  
  }
}
```

An database dialect could be `mariadb`. See [Sequelize](https://sequelize.org/docs/v6/getting-started/) doc for other options.


### Production
Create a .env file using the following format.
``` bash
API_KEY=<PTCG Api-key>
DB_HOST=<host>
DB_NAME=<name>
DB_USER=<username>
DB_PASSWORD=<password>
DB_DIALECT=<dialect>
```

An database dialect could be `mariadb`. See [Sequelize](https://sequelize.org/docs/v6/getting-started/) doc for other options.
