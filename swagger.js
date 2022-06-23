const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'FoodieMx API',
        description: 'Foodies REST API for CS341',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

//swaggerAutogen(outputFile, endpointsFiles, doc)

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app')
});
