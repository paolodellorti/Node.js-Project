# POLLUTION REPORTER
A node application for reporting pollution cases around the world.

<br>

___

<br>

## SET UP
### Requirements
You need to have installed on your pc
- Node.js
- Mysql
- GitHub CLI

### How to install
Is time to clone the project's repo. Inside the folder you choose, open a terminal and type
```
gh repo clone paolodellorti/Node.js-Project
```

<br>

Now install the project with
```
npm install
```


<br>

Ok, you've got the app folder with all the files you need. 
Inside the *config* folder, open *config.json* and put your MySQL credentials
```
{
    "development": {
        "username": "[YOUR_USERNAME]",
        "password": "[YOUR_PASSWORD]",
        "database": "reportsDb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
```

<br>

Now create a new .env file with your Google Maps API key. Without this step app still work but geolocation don't
```
GOOGLE_MAPS_API_KEY = yourGoogleMapsApiKey
```

<br>

Let's create the database *reportsDb*. Open a terminal in project's main folder and type
```
sequelize db:create
```

<br>

Then create the table *reports* by running 
```
sequelize db:migrate
```

<br>

Last step! Load a demo database by typing
```
node helpers/demoDB
```

<br>

Now you're ready to use the app.
To start the server type
```
node server
```
and try it on your browser  at
http://localhost:8080/
___
## HOW IT LOOKS
### Home page
![home](https://user-images.githubusercontent.com/84512004/144330324-768114cc-eb39-4062-a535-a29f381b64b2.png)
