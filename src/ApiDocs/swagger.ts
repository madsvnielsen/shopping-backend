import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v0.0.5',
        title: 'Shopping backend',
        description: 'Backend for a web shop'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['../server.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
