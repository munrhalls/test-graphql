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

  server.listen({
    port: 3000,
  });
}

main();
