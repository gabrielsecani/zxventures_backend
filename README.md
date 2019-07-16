# pdv backend challenge

ZXVentures Backend Challenge GLTR


## Getting Started

There are 2 ways to start and running this application. 
It is recommended using Docker to start the project, but you also can run it locally without docker, but you must have mongodb somewhere.

### Using Docker (Recommended)

with a docker installed, clone this repository and run the following steps:

```
git clone https://github.com/gabrieltr/zxventures_backend

docker-compose build --parallel --compress
docker-compose up
docker ps
```

Start a browser on localhost on port 80.
Nginx is proxying to internal node app from port 3000 to 80.

The application will be running at http://localhost (port default 80)

### Installing Manually

If you don't use docker then first install NodeJs and MongoDB

* [NodeJS](https://nodejs.org/en/) - v10 (or higher)
* [MongoDB](https://www.mongodb.com/) - v 4.0 (or higher)

With NodeJS and MongoDB installed and running, just run the following commands:

Set MongoDB url to a environment variable, before npm start:
```
MONGODB=mongodb://mongodb:27017/pdv
```

If is not set then 'mongodb://localhost:27017/pdv' will be used.


```
git clone https://github.com/camilocosta/pdv-das-brejas.git
npm install
npm start
```

The application will be running at http://localhost:3000 (port 3000)

Be default the application will be connect to MongoDB without user/pass. 
If you want to explicit user/pass or other configuration (like a diferent port connection to MongoDB), you will need to create an .env file in a root directory of the project with this configuration:

```
MONGODB=mongodb://localhost:27017/pdv
```


### API Documentation

This project has the following endpoints:

* get all (/pdv/v1/all)
* get byId :id  (/pdv/v1/:id)
* post create (/pdv/v1/create)
* Search by :Lng :Lat (/pdv/v1/search/:lng/:lat)
* Delete all and do populate again (/pdv/v1/populate/1)

*See [index](http://localhost) of running this project to samples*



## Author

* **Gabriel Lucas de Toledo Ribeiro** - [gabrieltr](https://github.com/gabrieltr)

