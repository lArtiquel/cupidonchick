const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");
const path = require("path");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Cupidonchik API",
    version: "1.0.0",
    description: "API documentation for CupidonChik Functions",
  },
  servers: [
    {
      url: "https://cupidonchik.netlify.app",
    },
    {
      url: "http://localhost:8888/.netlify/functions",
      description: "Local development server",
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["netlify/functions/*.ts"], // Path to your function files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Write the OpenAPI spec to a file
const outputPath = path.join(__dirname, "../public/openapi.json");
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log("✅ OpenAPI specification generated at public/openapi.json");
