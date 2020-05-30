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
    # createdAt: Date
    # updatedAt: Date
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    platform: [Platform]
    tag: [Tag]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    platform: (root, args, { db }) => {
      return db.platform.findAll();
    },
    tag: (root, args, { db }) => {
      return db.tag.findAll();
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
