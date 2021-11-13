import { user } from "../../helpers/mocks";
import { compareHash } from "../../helpers/security";
import User from "../../interfaces/user";

class UserService {
  authenticate = async (username: string, password: string): Promise<User> => {
    if (!username?.trim()) {
      throw new Error("Username is required");
    }

    if (!password?.trim()) {
      throw new Error("Password is required");
    }

    const user0 = user();
    if (username !== user0.email) {
      throw new ReferenceError("User not found");
    }

    // compare passwords
    const same = await compareHash(password, user0.password);
    if (!same) {
      throw new Error("Invalid username/password");
    }

    return user0;
  };
}

export default new UserService();
