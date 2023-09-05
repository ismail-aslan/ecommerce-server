module.exports = {
  "/users/register": {
    post: {
      tags: ["Users"],
      summary:
        "Allows users to create new accounts with a valid email and secure password, granting access to our platform.",
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
      summary:
        "Securely authenticates registered users with their email and password, granting access to their personalized profiles and platform features.",
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
      summary:
        "User Verification via Verification Code: Upon successful verification, the user will be granted 'ADMIN' privileges for a limited duration of 2 hours.",
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
      summary:
        "Enables administrators to update a user's role and status within the system, providing control over user permissions and account status management.",
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
      summary:
        "Allows administrators to delete a user's account based on their unique user ID, providing a means to manage user accounts within the system.",
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
