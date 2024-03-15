import swaggerAutogen from 'swagger-autogen';

let dev = true;
let host = dev ? "localhost:3000" : "130.225.170.52:10261/api"


const doc = {
    info: {
        version: 'v0.0.5',
        title: 'Shopping backend',
        description: 'Backend for a web shop'
    },
    host: host,

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
