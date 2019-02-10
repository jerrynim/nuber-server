const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator("driverUpdate");
        /*diverUpdate란 채널을 Listening 한다는 뜻 */
      }
    }
  }
};
export default resolvers;
