const swaggerJsDoc = require('swagger-jsdoc');

// This file is only used to create and build the API documentation for better readablity
const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'My Helix REST API',
        version: '1.0.0',
        description: "This is a CRUD API made with Express for the myHelix social media application running on a remote Digital Ocean server"
    },
    servers:[
        {
            url: "http://localhost:3000",
            description: 'Development Server'
        }
    ],
};

const options = {
    definition: swaggerDefinition,
    apis: ['./routes/*.js', './models/*.js']
}

const swaggerSpec = swaggerJsDoc(options);

// Export the swaggerJsdoc for use to route the API documentation in our app.js
module.exports = swaggerSpec;