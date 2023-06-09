const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
  
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
    });

app.post('/', function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);


var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
        }
}]};


const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/3c4e8c0b5c";

const options = {
    method: "POST",
    auth: "mike1:06d97c496c34b4252f6833c94cefaedb-us8"
}

const request = https.request(url, options, function(response){
    
    if(response.statusCode === 200){
        res.sendFile("__dirname + "/success.html);
    } else {
        res.sendFile("__dirname + "/failure.html);
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
    })

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    });


    //06d97c496c34b4252f6833c94cefaedb-us8 api key

    // 3c4e8c0b5c list id