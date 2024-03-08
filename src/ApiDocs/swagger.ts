import swaggerAutogen from 'swagger-autogen';

let host = "localhost:5000"

if(process.env.SWAGGER_HOST != undefined){
    host = process.env.SWAGGER_HOST as string
}

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
