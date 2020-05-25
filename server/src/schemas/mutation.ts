import { db } from "../../pgAdaptor";
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";
import { ProjectType } from "./types";

export const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        creatorId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) RETURNING title`;
        const values = [args.creatorId, new Date(), args.title, args.description];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
  },
});
