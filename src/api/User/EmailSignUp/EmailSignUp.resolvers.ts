import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      /*User가 존재하는지확인 >> 휴대폰인증이 되어있는지 확인>> 유저생성 >> 이메일전송 */
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "You Should log in instead",
            token: null
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          });
          if (phoneVerification) {
            const newUser = await User.create({ ...args }).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: "EMAIL"
              }).save();
              await sendVerificationEmail(
                newUser.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone nuber",
              token: null
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};
export default resolvers;
