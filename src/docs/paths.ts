export default {
  "/country/name/{name}": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["CountryController operations"], // operation's tag.
      summary: "Get countries by name", // operation's summary
      // description: "Get countries by name", // operation's desc.
      operationId: "getCountryByName", // unique operation id
      produces: ["application/json"],
      parameters: [
        {
          name: "name", // name of the param
          in: "path", // location of the param
          required: true, // Mandatory param
          description: "List of countries whose name contains provided pattern",
          schema: {
            $ref: "#/components/schemas/name", // data model of the param
          },
        },
      ],
      responses: {
        200: {
          description: "Data successfully fetched",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Countries",
              },
            },
          },
        },
        400: {
          description: "Country-name is required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
        401: {
          description: "Token is expired",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
        404: {
          description: "Country not found",
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response", // response data model
              },
            },
          },
        },
      },
    },
  },
  "/login": {
    post: {
      tags: ["UserController operations"],
      summary: "Authenticate user",
      // description: "Authenticate user",
      operationId: "login",
      produces: ["application/json"],
      parameters: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserCredentials",
            },
          },
        },
      },
      responses: {
        200: {
          status: true,
          description: "Login successful", // response desc
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthenticatedUser",
              },
            },
          },
        },
        400: {
          status: false,
          description: "Invalid username/password",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
        404: {
          status: false,
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
        500: {
          status: false,
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
      },
    },
  },
  "/ping": {
    get: {
      tags: ["UtilController operations"],
      summary: "Check the health-status",
      operationId: "ping",
      produces: ["application/json"],
      parameters: [],
      responses: {
        200: {
          description: "Pong...",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
      },
    },
  },
};
