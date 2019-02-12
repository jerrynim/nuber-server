import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      try {
        const ride = await Ride.create({ ...args, passenger: user }).save();
        return {
          ok: true,
          error: null,
          ride
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          ride: null
        };
      }
    })
  }
};

export default resolvers;
