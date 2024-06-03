module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      UserRegistrationInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          surname: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
          },
        },
        required: ["name", "surname", "email", "password"],
      },
      UserLoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
          },
        },
        required: ["email", "password"],
      },
      UserUpdateRoleAndStatusInput: {
        type: "object",
        properties: {
          role: {
            type: "string",
            enum: ["standard", "employee", "admin"],
          },
          email: {
            type: "string",
            format: "email",
          },
          status: {
            type: "string",
            enum: ["pending", "active", "blocked"],
          },
        },
      },
      UserUpdateRoleAndStatusResponse: {
        type: "object",
        properties: {
          userRole: {
            type: "string",
            enum: ["standard", "employee", "admin"],
          },
          userStatus: {
            type: "string",
            enum: ["pending", "active", "blocked"],
          },
        },
      },
      UserResponse: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          surname: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          status: {
            type: "string",
            enum: ["pending", "active", "blocked"],
          },
          role: {
            type: "string",
            enum: ["standard", "admin"],
          },
          token: {
            type: "string",
          },
        },
      },
      ProductUpdateInput: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID of the product to update",
            example: 1,
          },
          title: {
            type: "string",
            description: "Updated title of the product",
            example: "Updated Product Title",
          },
          price: {
            type: "number",
            description: "Updated price of the product",
            example: 99.99,
          },
          showDiscount: {
            type: "boolean",
            description:
              "Flag indicating whether to show discount for the product",
            example: true,
          },
          description: {
            type: "string",
            description: "Updated description of the product",
            example: "Updated product description",
          },
          unitCount: {
            type: "integer",
            description: "Updated unit count of the product",
            example: 5,
          },
          isListed: {
            type: "boolean",
            description: "Flag indicating whether the product is listed",
            example: true,
          },
          categoryIds: {
            type: "array",
            items: {
              type: "integer",
            },
            description: "Array of category IDs to associate with the product",
            example: [1, 2],
          },
        },
        required: ["id"],
      },
      ProductInput: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          price: {
            type: "number",
          },
          showDiscount: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          unitCount: {
            type: "integer",
          },
          isListed: {
            type: "boolean",
          },
          categoryIds: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["title", "price", "description"],
      },
      ReviewInput: {
        type: "object",
        properties: {
          rating: {
            type: "string",
            description: "Rating for the product (1-5)",
          },
          content: {
            type: "string",
            description: "Review content",
          },
          showFullName: {
            type: "boolean",
            description: "Show full name in review",
          },
        },
      },
      ReviewVoteInput: {
        type: "object",
        properties: {
          isLike: {
            type: "boolean",
            description: "Flag indicating whether the vote is like or dislike",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "error",
          },
          message: {
            type: "string",
          },
        },
      },
    },
    responses: {
      NoContent: {
        description: "No Content",
        content: {
          "application/json": {
            example: null,
          },
        },
      },
      BadRequest: {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "error",
              message: "Bad request. Please check your input.",
            },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "error",
              message: "The requested resource was not found.",
            },
          },
        },
      },
      Unauthorized: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "error",
              message: "Unauthorized. Please authenticate.",
            },
          },
        },
      },
      Forbidden: {
        description: "Forbidden",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "error",
              message:
                "Forbidden. You don't have permission to access this resource.",
            },
          },
        },
      },
      InternalServerError: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "error",
              message:
                "An internal server error occurred. Please try again later.",
            },
          },
        },
      },
    },
  },
};
