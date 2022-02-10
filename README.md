# Masrapt API

This API assists an Android application called Masrapt, which serves to control bus routes along with the positions of each bus in real time. This API also allows the transmission of more information about the buses, such as how many people are on the bus, how many available seats we have, etc...

> The routes defined in the API are specific routes for use within the application.

## Installation / How to use

First you have cloned this repos.
Then, in the path of the folder where the clone was made, run the following commands in order.

#### Install the app dependencies
```sh
npm install
```
#### Create Database
Use the **db_masrapt.sql** script on the db folder of the project to create the Mysql database.

#### Configure Environment Variables
If you are Windows user, you just need to create a .env file on the API folder.
If you are a Linux user, you can use one of the following commands to create the .env file.
```sh
gedit .env
```
or
```sh
vim .env
```
After creating after having created in the .env file enter SQL server credentials.
Example
```sh
DB_CONNECTION_LIMIT=100
DB_HOST=[your_host_name]
DB_USER=[your_user_name]
DB_PASSWORD=[your_password]
DB_CENTRAL_DATABASE=db_masrapt
```
#### Run the API
- Normal run
```sh
npm start
```

- Run on a Apache Server
```sh
sudo npm start
```

#### Simulate Bus Interaction

In order to simulate the bus interaction and information update, it's necessary to run the python script on the project.

**Note** If the API is not running on localhost, you may need to change the value of the string BASE_URL on the app to the correct URL

```sh
python simutate_bus_trajetory.py
```

## License

This repo use MIT License.

**"The code needs to go through different approaches before it is as effective as possible"**
