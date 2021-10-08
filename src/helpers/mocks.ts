import User from "../interfaces/user";

export const user = (): User => ({
  id: parseInt(process.env.DEFAULT_USER_ID!, 10),
  firstName: process.env.DEFAULT_USER_LAST_NAME!,
  lastName: process.env.DEFAULT_USER_FIRST_NAME!,
  email: process.env.DEFAULT_USER_EMAIL!,
  password: process.env.DEFAULT_USER_PASSWORD, // password
});
