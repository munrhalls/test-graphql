const { fastify, Request: fastifyRequest } = require("fastify");
const {
  getGraphQLParameters,
  processRequest,
  sendResult,
} = require("graphql-helix");
const executableSchema = require("./schema/schema.ts");

async function main() {
  const server = fastify();

  console.log(executableSchema);

  server.route({
    method: "POST",
    url: "/graphql",
    handler: async (req: typeof fastifyRequest, reply: Response) => {
      const request: typeof fastifyRequest = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
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
