const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const morgan = require('morgan');
const exphbs = require('express-handlebars');
//const passport = require('passport');
const session = require('express-session');

const mongodb = require('./models');


const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true}))
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Acces-Control-Allow-Origin', '*');
        next();    
    });

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Passport config
//require('./config/passport')(passport);

// Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
/*
app
    .use(passport.initialize())
    .use(passport.session());
    */

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes'))

mongodb.mongoose.connect(mongodb.url,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{app.listen(port,()=>{console.log(`DB conection with succes on port ${port}. SERVER running in ${process.env.NODE_ENV} mode.`)})})
    .catch(e=>console.log(e));