import User from "../../../entities/User";
import { GetMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        try {
          const user: User = req.user;
          return {
            ok: true,
            error: null,
            user
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            user: null
          };
        }
      }
    )
  }
};
export default resolvers;
