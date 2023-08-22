module.exports = {
  "/users/register": {
    post: {
      tags: ["Users"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserRegistrationInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserResponse",
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
  "/users/login": {
    post: {
      tags: ["Users"],
      summary: "Log in user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserLoginInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserResponse",
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/users/{verificationCode}": {
    get: {
      tags: ["Users"],
      summary: "Verify user by verification code",
      parameters: [
        {
          in: "path",
          name: "verificationCode",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        302: {
          description:
            "Redirects to another page according to validation results",
          headers: {
            Location: {
              schema: {
                type: "string",
              },
              description:
                process.env.CLIENT_BASE_URL + "?verified={verification result}",
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/users": {
    post: {
      tags: ["Users"],
      summary: "Update user role and status",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserUpdateRoleAndStatusInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserUpdateRoleAndStatusResponse",
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        403: {
          $ref: "#/components/responses/Forbidden",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/users/{userId}": {
    delete: {
      tags: ["Users"],
      summary: "Delete user by ID",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: {
            type: "integer",
            format: "int64",
          },
        },
      ],
      responses: {
        204: {
          description: "No Content",
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        403: {
          $ref: "#/components/responses/Forbidden",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
