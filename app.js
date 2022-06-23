const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./models');

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Acces-Control-Allow-Origin', '*');
        next();    
    })
    .use('/', require('./routes'));

mongodb.mongoose.connect(mongodb.url,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{app.listen(port,()=>{console.log(`DB conection with succes on ${port}`)})})
    .catch(e=>console.log(e));