module.exports = {
  "/cart": {
    get: {
      summary: "Get user's cart",
      tags: ["Cart"],
      security: [{ BearerAuth: [] }],
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
    parameters: [],
  },
  "/cart/{id}": {
    get: {
      summary: "Add a product to the cart",
      tags: ["Cart"],
      security: [{ BearerAuth: [] }],
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
          description: "Bad Request: Invalid product ID or product not listed",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Invalid product id",
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
          description: "Forbidden: User account is disabled",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Forbidden",
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
      summary: "Remove a product from the cart",
      tags: ["Cart"],
      security: [{ BearerAuth: [] }],
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
          description: "Bad Request: Invalid product ID or product not in cart",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "This product is not in your cart",
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
          description: "Forbidden: User account is disabled",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Forbidden",
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
