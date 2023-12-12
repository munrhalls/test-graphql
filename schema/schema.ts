const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./typeDefs.graphql");

const products = [
  {
    name: "UltraWidget Pro 0",
    price: 49.99,
    currency: "USD",
    category: "Electronics",
    description: "Compact, high-efficiency widget with advanced features.",
  },
  {
    name: "UltraWidget Pro 1",
    price: 59.99,
    currency: "USD",
    category: "Electronics",
    description: "Compact, high-efficiency widget with advanced features+.",
  },
  {
    name: "UltraWidget Pro 2",
    price: 69.99,
    currency: "USD",
    category: "Electronics",
    description: "Compact, high-efficiency widget with advanced features++.",
  },
];
const resolvers = {
  Query: {
    products: () => products,
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
