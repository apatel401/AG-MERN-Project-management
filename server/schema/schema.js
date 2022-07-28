const { projects, clients } = require("../dummyData.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
//client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Project type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      client: {
        type: ClientType,
        resolve(parent, args){
            return clients.find(client => client.id === parent.id)
        }
      }
    }),
  });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args) {
        return clients;
      },
    },
    projects : {
        type: new GraphQLList(ProjectType),
        resolve(parentValue, args) {
          return projects;
        },
      },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
    client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, args) {
          return clients.find((client) => client.id === args.id);
        },
      },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
