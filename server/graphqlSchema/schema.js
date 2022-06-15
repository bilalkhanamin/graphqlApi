const Todo = require("../models/Todo");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema
} = require("graphql");

// Todo type
const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                completed: { type: GraphQLBoolean },
            },
            resolve(parent, args) {
                let todo = new Todo({
                    title: args.title,
                    description: args.description,
                    completed: args.completed,
                });
                return todo.save();
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Todo.findByIdAndRemove(args.id);
            }
        },
        updateTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                completed: { type: GraphQLBoolean },
            },
            resolve(parent, args) {
                return Todo.findByIdAndUpdate(args.id, {
                    title: args.title,
                    description: args.description,
                    completed: args.completed,
                });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
   });
  