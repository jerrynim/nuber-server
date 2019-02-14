import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(async (_, args, { req, pubSub }) => {
      const user: User = req.user;
      if (!user.isRiding && !user.isDriving) {
        try {
          const ride = await Ride.create({ ...args, passenger: user }).save();
          pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
          user.isRiding = true;
          user.save();
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
      } else {
        return {
          ok: false,
          error: "Yu can't request two rides or drive and request",
          ride: null
        };
      }
    })
  }
};

export default resolvers;
