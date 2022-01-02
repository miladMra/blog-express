const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const public = path.join(__dirname,'../../public');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const sessionStore = require('./express-hadnlers/redis')(session)
module.exports = (app)=>{
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());
    app.use(cookieParser('keyboard cat'));
    app.use(session({
        store: sessionStore,
        secret : 'kfkskje0303csp1',
        resave : false, 
        saveUninitialized: true,
        }));
    app.use(flash());
    app.use(fileUpload({
        useTempFiles : true,
        createParentPath : true
    }));
    app.engine('handlebars', hbs());
    app.set('view engine', 'handlebars'); 
    app.set('views',path.join(__dirname,'../views'));
    app.use(express.static(path.join(public)))
}