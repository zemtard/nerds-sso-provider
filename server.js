require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;


app.use(cors({
    origin: "http://"+ process.env.FRONTEND,
}))



app.use(bodyParser.json());

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

let users = [];




app.get("/status", async (req, res) => {
    res.send("im online");
    console.log("[ENDPOINT] GET STATUS");
  });


  app.post('/user-login', async (req, res) => {
    try {
      const requestData = req.body; // receive the request
      let message = 'POST request successfully received, logging in';
      console.log(requestData);
  
      // Check if email and password exist
      if (requestData.username && requestData.password) {
        // Check if email and password match the stored data
        const user_username = users.find((user) => user.username === requestData.username);
        const user_passw = users.find((user) => user.password === requestData.password);
  
        if (user_username && user_passw) {
          console.log("Email and password matching");
  
          
          const token = jwt.sign({ username: user_username }, secretKey, {
            expiresIn: '6h',
          });
  
          res.json({ message, token });
        } else {
          message = 'Incorrect email or password!';
          res.status(401).json({ message });
        }
      } else {
        message = 'Empty fields'; 
        res.status(400).json({ message });
      }
  
      console.log("Post endpoint called");
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'An error occurred.' });
    }
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




  app.use( //ROUTES UNDER THIS FUNCTION REQUIRES AUTHORIZATION
    auth({
      issuerBaseURL: 'http://127.0.0.1:5173',
      audience: 'http://127.0.0.1:3000',
    })
  );

  app.get("/status1", auth, async (req, res) => {
    try {
    res.send("im online PROTECTED");
    console.log("[ENDPOINT] GET STATUS");
    } catch (error) {
        res.send(error)
    }
    
  });

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });