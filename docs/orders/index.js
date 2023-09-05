const { VALID_LIMIT_VALUES, ORDER_STATUS } = require("../../constants");

module.exports = {
  "/orders": {
    get: {
      summary: "Get orders",
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
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
          schema: { type: "string", enum: VALID_LIMIT_VALUES },
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
          $ref: "#/components/responses/BadRequest",
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
      security: [{ bearerAuth: [] }],
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
          $ref: "#/components/responses/BadRequest",
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
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
          schema: { type: "string", enum: ORDER_STATUS },
          description: "New status for the order",
        },
      ],
      security: [{ bearerAuth: [] }],
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
          $ref: "#/components/responses/BadRequest",
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
