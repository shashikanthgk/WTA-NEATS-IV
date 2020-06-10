const functions = require('firebase-functions');
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
var token = "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"
function authenticate(req,res,next)
{
  if(req.body.token==token)
  {
    next()
  }
  else{
    res.json({message:"You can't send message you are not authorized.Warning !!!!!!!! Your account will be hacked in few minutes carefull"})
  }
}
// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail",authenticate, (req, res) => {
  // console.log("request came");
  let user = req.body;
  // console.log(req.body)

  if(user!={}){
  sendMail(user, (err, info) => {
    if (err) {
      // console.log(err);
      res.status(400);
      res.send({message:"there is a error while sending message", error: err});
    } else {
      // console.log("Email has been sent",info);
      res.json({message:"Email has been sent",info:info});
    }
  });
}
else{
  // console.log("NO data")
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
      //  console.log("erorro in the console ",error);
       callback(error,null)
  }
      // console.log('Message sent: ' + info); 
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




exports.app = functions.https.onRequest(app)
