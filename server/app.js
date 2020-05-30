const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./models/index.js");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Platform{
    id: Int
    name: String
    # createdAt: Date
    # updatedAt: Date
  }

  type Tag{
    id: Int
    name: String
    userId: Int
    createdById: Int
    # createdAt: Date
    # updatedAt: Date
  }

  type Item{
    id: Int
    platformId: Int
    createdById: Int
    name: String
    description: String
    link: String
    userId: Int
    # createdAt: Date
    # updatedAt: Date
  }

  type User{
    id: Int
    email: String
    #Should it be a String?
    password: String
    username: String
    # createdAt: Date
    # updatedAt: Date   
  }

  type Vote{
    id: Int
    tagId: Int
    userId: Int
    itemId: Int
    # createdAt: Date
    # updatedAt: Date 
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
      return db.platform.findAll();
    },
  },
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

  await db.platform.sync()
  await db.user.sync()
  await db.item.sync()
  await db.tag.sync()
  db.vote.sync()
}

syncDB();

// db.sequelize.sync()

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
