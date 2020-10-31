const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');


const HTTP_PORT = process.env.PORT || 8080;

const urlencodedParser = bodyParser.urlencoded({extended: false})


app.use(express.static("./public/"));

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.set('views',path.join(__dirname,'views'));

app.engine('handlebars', exphbs({ 
    
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'handlebars')


app.get("/", function(req,res){
    res.render("home",{
        
       
    });
});


app.get("/room", function(req,res){
   
   
   

    res.render("room",{
       
        

    });
});

app.get("/register", function(req,res){
    res.render("register",{
        

    });
    
});




app.get("/login", function(req,res){
    res.render("login",{
        

    });
});


app.post("/register", urlencodedParser,[
    check('email','This email is invalid')
    .isEmail()
    .normalizeEmail()
    .exists(),
    
    check('pwd')
    .isLength({min: 6, max: 12}).withMessage('Password must be between 6 and 12 characters')
    .matches(/^[A-Za-z0-9\s]+$/).withMessage('No special characters')
    


],
(req,res)=>{
    
  const errors = validationResult(req)
   if(!errors.isEmpty()){
       const alert = errors.array();
     
  if(typeof alert != 'undefined'){
      
      alert.forEach(function(error){
        res.render('register',{
            
            errorMessage: error.msg
            

            
            
              
          }

              
          )   
          
          
          
      })

  }
    
  

   }
   
   res.render('register',()=>{
    res.redirect('/');  
   
}) 
 
});


app.post("/login", urlencodedParser,[
    check('email','This email is invalid')
    .isEmail()
    .normalizeEmail()
    .exists()
    
    ,
    
    check('pwd')
    
    .notEmpty().withMessage('Empty Field for Password')
    


],
(req,res)=>{
    
  const errors = validationResult(req)
   if(!errors.isEmpty()){
       const alert = errors.array();
     
  if(typeof alert != 'undefined'){
      
      alert.forEach(function(error){
        res.render('login',{
            
            errorMessage1: error.msg
            

            
            
              
          }

              
          )   
          
          
          
      })

  }
    
  

   }
   
   res.render('login',()=>{
   res.redirect('login');

}) 
 
});

app.listen(HTTP_PORT, onHttpStart);