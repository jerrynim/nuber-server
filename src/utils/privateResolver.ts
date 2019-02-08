/*함수를 실행하기전 context를 확인하고 함수결과를 grqphql에 주는 보호하기위한 curry 방식 */

const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("No JWT. I refuse to proceed");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
