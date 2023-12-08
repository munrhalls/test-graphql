const { fastify, FastifyRequest } = require("fastify");
const {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} = require("graphql-helix");
const server = fastify();

server.route({
  url: "/graphql",
  method: "POST",
  handler: async (req: typeof FastifyRequest) => {
    const helixRequest = {
      headers: req.headers,
      method: req.method,
      body: req.body,
      query: req.query,
    };

    const { operationName, query, variables } = getGraphQLParameters();

    processRequest({
      request,
      schema,
      operationName,
      query,
      variables,
    });
  },
});

server.listen(3000, "localhost", () => {
  console.log("GraphQL server listening on port 3000...");
});
