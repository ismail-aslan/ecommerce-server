module.exports = {
  "/categories": {
    get: {
      summary: `This "Categories" endpoint allows users to retrieve a list of all available categories.`,
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
      summary: `Authenticated users can create a new category using this endpoint. `,
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
      summary: `Authenticated users can update an existing category by specifying its ID in the request body.`,
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
      summary: `Users can retrieve a specific category by specifying its ID in the request path.`,
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
      summary: `Authenticated users can delete a category by specifying its ID in the request path.`,
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
