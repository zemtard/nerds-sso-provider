const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')

app.use(cors({
    origin: "http://127.0.0.1:5173",
}))

app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 3000;

const users = {
    'user1': { id: 'user1', password: 'zzz', name: 'User One' },
    'user2': { id: 'user2', password: '123', name: 'User Two' },
  };


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


app.get("/status", async (req, res) => {
    res.send("im online");
    console.log("[ENDPOINT] GET STATUS");
  });


app.post('/user-login', (req, res) => {

    const requestData = req.body; //receive the request
    console.log(requestData);
    
    //TODO ENSURE USER EXISTS, IF EXISTS LOG HIM IN IF NOT DENY

    res.json({ message: 'POST request successfully received' });
  });


app.post('/user-register', (req, res) => {
    
    const requestData = req.body; //receive the register request
    console.log(requestData);
    
    //TODO ensure all fields are as expected, if they are - create new user

    res.json({ message: 'POST request successfully received' });
  });



