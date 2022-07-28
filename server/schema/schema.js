// const { projects, clients } = require("../dummyData.js");

const Project = require('../models/Project')
const Client = require('../models/Client')

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
            return clients.findById(parent.clientId)
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
        return Client.find()
      },
    },
    projects : {
        type: new GraphQLList(ProjectType),
        resolve(parentValue, args) {
          return Project.find()
        },
      },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return Project.findById(args.id);
      },
    },
    client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, args) {
          return Client.findById(args.id);
        },
      },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
