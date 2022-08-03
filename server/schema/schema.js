// const { projects, clients } = require("../dummyData.js");

const Project = require('../models/Project')
const Client = require('../models/Client')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
            return Client.findById(parent.clientId)
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


//Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    //Adding a new client
    addClient: {
      type: ClientType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        phone: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args){
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        });
        return client.save();
      }
    },
    //Deleting existing Client
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLID},
      },
      resolve(parent, args){
        return Client.findByIdAndRemove(args.id)
      }
    },

      //Adding a new project
      addProject: {
        type: ProjectType,
        args: {
          name: {type: new GraphQLNonNull(GraphQLString)},
          description: {type: new GraphQLNonNull(GraphQLString)},
          status: {
            type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new : {value: 'Not Started'},
              progress : {value: 'In Progress'},
              completed : {value: 'Complete'},
            }
          }),
          defaultValue: 'Not Started',
        },
        clientId: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parent, args){
          const project = new Project({
            name: args.name,
            description: args.description,
            status: args.status,
            clientId: args.clientId
          });
          return project.save();
        }
      },
      //Deleting existing project
      deleteProject: {
        type: ProjectType,
        args: {
          id: {type: GraphQLID},
        },
        resolve(parent, args){
          return Project.findByIdAndRemove(args.id)
        }
      },
      //Update existing project
      updateProject:{
        type: ProjectType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)},
          name: {type:GraphQLString},
          description: {type: GraphQLString},
          status: {type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new : {value: 'Not Started'},
              progress : {value: 'In Progress'},
              complete : {value: 'Completed'},
            }
          })
          },
        },
        resolve(parent, args){
          return Project.findByIdAndUpdate(
            args.id,
            {
              $set:{
                name: args.name,
                description: args.description,
                status: args.status,
              }
            },
            {new: true}
            );
        }
      }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
