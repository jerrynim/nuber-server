import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RideStatusSubscription: { driverId, PassengerId }
          } = payload;
          return user.id === driverId || user.id === PassengerId;
        }
      )
    }
  }
};
export default resolvers;
