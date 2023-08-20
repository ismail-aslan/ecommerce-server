module.exports = {
  "/categories": {
    get: {
      summary: "Get all categories",
      tags: ["Categories"],
      responses: {
        200: {
          description: "Successfully retrieved categories",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: [
                  {
                    id: 1,
                    name: "Electronics",
                  },
                  {
                    id: 2,
                    name: "Clothing",
                  },
                ],
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Something went wrong!",
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new category",
      tags: ["Categories"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
              },
              required: ["name"],
            },
            example: {
              name: "Furniture",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Successfully created the category",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  id: 3,
                  name: "Furniture",
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request: Missing data",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Missing data",
              },
            },
          },
        },
        401: {
          description: "Unauthorized: Missing or invalid token",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Missing token",
              },
            },
          },
        },
        403: {
          description: "Forbidden: User account is disabled or not allowed",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "You are not allowed to do that!",
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Something went wrong!",
              },
            },
          },
        },
      },
    },
    patch: {
      summary: "Update a category by ID",
      tags: ["Categories"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
              },
              required: ["id", "name"],
            },
            example: {
              id: 3,
              name: "New Furniture Name",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully updated the category",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: [
                  1,
                  {
                    id: 3,
                    name: "New Furniture Name",
                  },
                ],
              },
            },
          },
        },
        400: {
          description: "Bad Request: Missing or wrong parameters",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Missing or wrong parameters",
              },
            },
          },
        },
        401: {
          description: "Unauthorized: Missing or invalid token",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Missing token",
              },
            },
          },
        },
        403: {
          description: "Forbidden: User account is disabled or not allowed",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "You are not allowed to do that!",
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Something went wrong!",
              },
            },
          },
        },
      },
    },
  },
  "/categories/{id}": {
    get: {
      summary: "Get a category by ID",
      tags: ["Categories"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the category",
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved the category",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  id: 1,
                  name: "Electronics",
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Something went wrong!",
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete a category by ID",
      tags: ["Categories"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the category",
        },
      ],
      responses: {
        204: {
          description: "Successfully deleted the category",
          content: {
            "application/json": {
              example: {
                status: "success",
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Something went wrong!",
              },
            },
          },
        },
      },
    },
  },
};
