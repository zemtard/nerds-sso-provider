const express = require("express");
const app = express();

//const server = require("http").createServer(app);

const hostname = '127.0.0.1';
const port = 3000;


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


app.get("/status", async (req, res) => {
    res.send("im online");
    console.log("[ENDPOINT] GET STATUS");
  });


app.post('/user-login', (req, res) => {

    const requestData = req.body; //receive the request
    console.log(req.body);
    
    //TODO ENSURE USER EXISTS, IF EXISTS LOG HIM IN IF NOT DENY

    res.json({ message: 'POST request successfully received' });
  });


app.post('/user-register', (req, res) => {
    
    const requestData = req.body; //receive the register request
    
    //TODO ensure all fields are as expected, if they are - create new user

    res.json({ message: 'POST request successfully received' });
  });



