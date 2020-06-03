const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./models/index.js");
const { GraphQLScalarType } = require("graphql");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar Date
  # This "Book" type defines the queryable fields for every book in our data source.
  type Platform {
    id: Int
    name: String
    createdAt: Date
    updatedAt: Date
  }

  type Tag {
    id: Int
    name: String
    userId: Int
    createdById: Int
    createdAt: Date
    updatedAt: Date
  }

  type Item {
    id: Int
    platformId: Int
    createdById: Int
    name: String
    description: String
    link: String
    userId: Int
    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: Int
    email: String
    password: String
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type Vote {
    id: Int
    tagId: Int
    userId: Int
    itemId: Int
    createdAt: Date
    updatedAt: Date
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    item: [Item]
    platform: [Platform]
    tag: [Tag]
    user: [User]
    vote: [Vote]
  }

  type Mutation {
    #Creates
    createPlatform(name: String): Platform
    createTag(name: String, userId: Int, createdById: Int): Tag
    createItem(
      platformId: Int
      createdById: Int
      name: String
      description: String
      link: String
      userId: Int
    ): Item
    createUser(email: String, password: String, username: String): User
    createVote(tagId: Int, userId: Int, itemId: Int): Vote
    #Updates
    # Params are same as create except add id
    updatePlatform(id: Int, name: String): Boolean
    #Deletes
    # Delete should only take id
    deletePlatform(id: Int): Boolean
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    item: (root, args, { db }) => {
      return db.platform.findAll();
    },
    platform: (root, args, { db }) => {
      return db.platform.findAll();
    },
    tag: (root, args, { db }) => {
      return db.tag.findAll();
    },
    user: (root, args, { db }) => {
      return db.tag.findAll();
    },
    vote: (root, args, { db }) => {
      return db.vote.findAll();
    },
  },
  Mutation: {
    createPlatform: async (root, args, { db }) => {
      const results = await db.platform.create({ name: args.name });
      return {
        success: results && results.length,
        message: "platfom created",
        id: results.dataValues.id,
      };
    },
    createTag: async (root, args, { db }) => {
      const results = await db.tag.create({
        userid: args.userid,
        createById: args.createById,
      });
      return {
        success: results && results.length,
        message: "tag created",
        id: results.dataValues.id,
      };
    },
    createItem: async (root, args, { db }) => {
      const results = await db.item.create({
        platformId: args.platformId,
        createdById: args.createById,
        name: args.name,
        description: description.name,
        link: args.link,
        userId: args.userId,
      });
      return {
        success: results && results.length,
        message: "item created",
        id: results.dataValues.id,
      };
    },
    createUser: async (root, args, { db }) => {
      const results = await db.user.create({
        email: args.email,
        password: args.password,
        username: args.username,
      });
      return {
        success: results && results.length,
        message: "user created",
        id: results.dataValues.id,
      };
    },
    createVote: async (root, args, { db }) => {
      const results = await db.vote.create({ tagId: args.tagId, userId: args.userId });
      return {
        success: results && results.length,
        message: "vote created",
        id: results.dataValues.id,
      };
    },
    // Update we need to pass the fields that can be updated, and add a where statement with the id.
    updatePlatform: async (root, args, { db }) => {
      const results = await db.platform.update(
        { name: args.name },
        { where: { id: args.id } }
      );
      return results && results.length;
    },
    // Delete should only take id
    deletePlatform: async (root, args, { db }) => {
      const result = await db.platform.destroy({
        where: {
          id: args.id,
        },
      });
      return !!result;
    },
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context: { db } });

const app = express();

server.applyMiddleware({ app }); // app is from an existing express app. Mount Apollo middleware here. If no path is specified, it defaults to `/graphql`.

const syncDB = async () => {
  // await db.vote.drop()
  // await db.item.drop()
  // await db.tag.drop()
  // await db.user.drop()
  // db.platform.drop()

  await db.platform.sync();
  await db.user.sync();
  await db.item.sync();
  await db.tag.sync();
  db.vote.sync();
};

syncDB();

const port = 3000;

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
