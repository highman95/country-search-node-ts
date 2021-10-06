import User from "../interfaces/user";

export const user = (): User => ({
  id: 2021,
  email: "john@wick.com",
  firstName: "John",
  lastName: "Wick",
  password: "$2a$10$UTmPCP4M1IEXq98lCpQ4p.9MhdxkyQFciTE8EJS2.ES7Xs99g4cJS", // password
});
