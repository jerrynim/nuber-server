/*Object의 null을 없애는 함수 */

const cleanNullArgs = (args: object) => {
  const notNull = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};
export default cleanNullArgs;
