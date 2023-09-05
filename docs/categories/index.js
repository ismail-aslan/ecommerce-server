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
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    post: {
      summary: "Create a new category",
      tags: ["Categories"],
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
    patch: {
      summary: "Update a category by ID",
      tags: ["Categories"],
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
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
              },
              required: ["id", "name"],
            },
            example: {
              id: 3,
              name: "New Category Name",
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
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    delete: {
      summary: "Delete a category by ID",
      tags: ["Categories"],
      security: [
        {
          bearerAuth: [],
        },
      ],
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
          $ref: "#/components/responses/NoContent",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
