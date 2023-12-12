/* IMPORTANT 
- all CommonJS modules jere stay CommonJS modules best compatibility

- syntax is //import fastify from "fastify"// for ES modules 
- for CommonJS modules, with verbatimModuleSyntax + esModuleInterop, 
syntax has to be pre-2015 TS //import foo = require("foo")//

- TS configs: "moduleResolution": "Node" | "verbatimModuleSyntax": true  | "esModuleInterop": true
- Why? verbatimModuleSyntax sidesteps issues of transpiling to CommonJS
- TS docs explanation: https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html?
*/

import fastify from "fastify";
const {
  getGraphQLParameters,
  processRequest,
  sendResult,
} = require("graphql-helix");
const executableSchema = require("./schema/schema.ts");

async function main() {
  const server = fastify();

  server.route({
    method: "POST",
    url: "/graphql",
    handler: async function (request, reply) {
      console.log(request);

      const Request = {
        headers: request.headers,
        method: request.method,
        query: request.query,
        body: request.body,
      };

      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        request,
        schema,
        operationName,
        query,
        variables,
      });

      sendResult(result, reply.raw);
    },
  });

  server.listen(3000, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:3000/`);
  });
}

main();
