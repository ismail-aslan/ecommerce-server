module.exports = {
  "/orders": {
    get: {
      summary: "Get orders",
      tags: ["Orders"],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "country",
          schema: { type: "string" },
          description: "Filter orders by country",
        },
        {
          in: "query",
          name: "status",
          schema: { type: "string" },
          description: "Filter orders by status",
        },
        {
          in: "query",
          name: "order_by",
          schema: { type: "string" },
          description: "Sort orders by a field (id, user)",
        },
        {
          in: "query",
          name: "desc",
          schema: { type: "boolean" },
          description: "Sort orders in descending order",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "string", enum: ["1", "2", "10", "20", "30"] },
          description: "Limit the number of results per page",
        },
        {
          in: "query",
          name: "offset",
          schema: { type: "string" },
          description: "Offset for pagination",
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved orders",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  count: 2,
                  orders: [
                    {
                      id: 1,
                      recieverName: "John Doe",
                      status: "shipped",
                      OrderItems: [
                        {
                          quantity: 2,
                          Product: {
                            id: 1,
                            title: "Product A",
                            images: ["image1.jpg", "image2.jpg"],
                          },
                        },
                      ],
                    },
                    {
                      id: 2,
                      recieverName: "Jane Smith",
                      status: "pending",
                      OrderItems: [
                        {
                          quantity: 1,
                          Product: {
                            id: 2,
                            title: "Product B",
                            images: ["image3.jpg"],
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request: Invalid query parameters",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Invalid order_by query",
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
  },
  "/orders/{id}": {
    get: {
      summary: "Get order by ID",
      tags: ["Orders"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the order to retrieve",
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully retrieved order",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: [
                  {
                    id: 1,
                    recieverName: "John Doe",
                    status: "shipped",
                    OrderItems: [
                      {
                        quantity: 2,
                        Product: {
                          id: 1,
                          title: "Product A",
                          images: ["image1.jpg", "image2.jpg"],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        400: {
          description: "Bad Request: Invalid order ID",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Invalid order ID",
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
    patch: {
      summary: "Update order status by ID",
      tags: ["Orders"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "integer" },
          required: true,
          description: "ID of the order to update",
        },
        {
          in: "query",
          name: "status",
          schema: { type: "string" },
          description: "New status for the order",
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully updated order status",
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
          description: "Bad Request: Invalid status",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Invalid status",
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
  },
};
