const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance 
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

//start application server on port 3000
app.listen(3000, () => {
  console.log("The server started on port 3000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(req.body)

  if(user!={}){
  sendMail(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({message:"there is a error while sending message", error: err});
    } else {
      console.log("Email has been sent",info);
      res.json({message:"Email has been sent",info:info});
    }
  });
}
else{
  console.log("NO data")
  res.json({message:"no data"})
}
});



const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "anamika.india.anonymous@gmail.com",
        pass: "ShashikanthDK@1234"
      }
    }); 



  if(!validateEmail(user.email)) callback("the email id is invalid ",null)
  else if(validateSubject_info(user.subject) || validateSubject_info(user.info)) callback("the email subject/info can not be blank ",null)

  else{
  const mailOptions = {
    from: `anamika.india.anonymous@gmail.com`,
    to: `<${user.email}>`,
    subject: `${user.subject}`,
    html: `${user.info}`
  };



  transporter.sendMail(mailOptions, function(error, info){

    if(error){
       console.log("erorro in the console ",error);
       callback(error,null)
  }
      console.log('Message sent: ' + info); 
      callback(null,info);
       }
  );
      }
  }


  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validateSubject_info(text) {
  var re = /^\s*$/;
  return re.test(String(text).toLowerCase());
}
