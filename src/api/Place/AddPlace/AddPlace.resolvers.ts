import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(async (_, args, { req }) => {
      const user = req.user;
      try {
        await Place.create({ ...args, user }).save();
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    })
  }
};
