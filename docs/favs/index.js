module.exports = {
  "/favs": {
    get: {
      summary: "Get user's favorite products",
      tags: ["Favorites"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully retrieved favorite products",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: [
                  {
                    id: 1,
                    title: "Product A",
                    price: 100.0,
                    unitCount: 10,
                  },
                  {
                    id: 2,
                    title: "Product B",
                    price: 50.0,
                    unitCount: 5,
                  },
                ],
              },
            },
          },
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
  "/favs/{id}": {
    get: {
      summary: "Add a product to user's favorites",
      tags: ["Favorites"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the product to be added to favorites",
        },
      ],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully added the product to favorites",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: 1,
              },
            },
          },
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    delete: {
      summary: "Remove a product from user's favorites",
      tags: ["Favorites"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the product to be removed from favorites",
        },
      ],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully removed the product from favorites",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: null,
              },
            },
          },
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
