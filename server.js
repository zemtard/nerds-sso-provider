const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer');

app.use(cors({
    origin: "http://127.0.0.1:5173",
}))

app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 3000;

let users = [];




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


app.get("/status", async (req, res) => {
    res.send("im online");
    console.log("[ENDPOINT] GET STATUS");
  });


app.post('/user-login', (req, res) => {

    const requestData = req.body; //receive the request
    let message = 'POST request successfully received, logging in';
    console.log(requestData);

    //Check if email and password exists
    if(requestData.username && requestData.password){
        //Check if email and password matches the stored data
        const user_username = users.find((user) => user.username === requestData.username)
        const user_passw = users.find((user) => user.password === requestData.password)
        if(user_username && user_passw){
            console.log("Email and password matching")
            //TODO on succesfull login authorize the user
        }else{
            message = 'Incorrect email or password!';
        }
    }else{
        message = 'Empty fields';
    }

console.log("Post endpoint called")
    
    //TODO ENSURE USER EXISTS, IF EXISTS LOG HIM IN IF NOT DENY

    res.json({ message });
  });


  app.post('/user-register', (req, res) => {
    const requestData = req.body; // receive the register request
    //console.log(requestData);
    let message = 'POST request successfully received, creating a new user'

    // Check if the required properties exist in the requestData object
    if (requestData.email && requestData.full_name && requestData.password && requestData.phone_number && requestData.username) {
        const user = {
            email: requestData.email,
            name: requestData.full_name,
            password: requestData.password,
            phone: requestData.phone_number,
            username: requestData.username
        };

        // If data is alright, add the user
        users.push(user);
    } else {
        message = 'Missing field, not creating a new user';
    }

    console.log(users, users.length);

    // TODO: CONNECT DATABASE
    // TODO: Ensure all fields are as expected, if they are - create a new user

    res.json({ message });
});


  app.get("/status1", async (req, res) => {
    res.send("im online PROTECTED");
    console.log("[ENDPOINT] GET STATUS");
  });

