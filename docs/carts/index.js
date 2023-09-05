module.exports = {
  "/cart": {
    get: {
      summary: "Get user's cart",
      tags: ["Cart"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully retrieved the user's cart",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  user_id: 1,
                  carts: [
                    {
                      id: 1,
                      price: 99.99,
                      quantity: 2,
                      product: {
                        id: 123,
                        title: "Sample Product",
                        price: 99.99,
                        unitCount: 100,
                        isListed: true,
                      },
                    },
                  ],
                },
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
    parameters: [],
  },
  "/cart/{id}": {
    get: {
      summary: "Add a product to the cart",
      tags: ["Cart"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the product to add to the cart",
        },
      ],
      responses: {
        200: {
          description: "Successfully added the product to the cart",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: 1,
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
    delete: {
      summary: "Remove a product from the cart",
      tags: ["Cart"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the product to remove from the cart",
        },
      ],
      responses: {
        200: {
          description: "Successfully removed the product from the cart",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: [],
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
};
