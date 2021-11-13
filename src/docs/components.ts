export default {
  securitySchemes: {
    // arbitrary name for the security scheme e.g. bearerAuth
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      // description:
      //   'Standard Authorization header using the Bearer scheme. Example: "bearer {token}"',
      // in: "header",
      // name: "authorization",
    },
  },
  schemas: {
    name: {
      type: "string",
      description: "An abbreviated or full country-name",
      example: "AUS",
    },
    Countries: {
      type: "object",
      properties: {
        status: {
          type: "boolean",
          example: true,
        },
        message: {
          type: "string",
          description: "Response message",
          example: "Data successfully fetched",
        },
        data: {
          type: "array",
          description: "The result returned for search-query",
          example: [
            {
              name: "Austria",
              region: "Europe",
              callingCodes: ["43"],
            },
          ],
        },
      },
    },
    AuthenticatedUser: {
      type: "object",
      properties: {
        status: {
          type: "boolean",
          example: true,
        },
        message: {
          type: "string",
          description: "Response message",
          example: "Login successful",
        },
        data: {
          type: "object",
          description: "The authenticated user information + bearer-token",
          example: {
            firstName: "Austria",
            lastName: "Europe",
            email: "john.doe@gmail.com",
            token: "string",
          },
        },
      },
    },
    UserCredentials: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: "User's Email-Address",
          example: "johndoe@yahoo.com",
        },
        password: {
          type: "string",
          description: "User's Password",
        },
      },
    },
    Response: {
      type: "object",
      properties: {
        status: {
          type: "boolean",
        },
        message: {
          type: "string",
        },
      },
    },
    DataResponse: {
      type: "object",
      properties: {
        status: {
          type: "boolean",
        },
        message: {
          type: "string",
        },
        data: {
          type: "array | object",
        },
      },
    },
  },
};
