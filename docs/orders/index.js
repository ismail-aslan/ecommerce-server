const {
  VALID_LIMIT_VALUES,
  ORDER_STATUS,
  ALLOWED_COUNTRIES,
} = require("../../constants");

module.exports = {
  "/orders": {
    get: {
      summary: `This endpoint allows authenticated users to retrieve a list of orders with advanced filtering and pagination options.`,
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "country",
          schema: { type: "string", enum: ALLOWED_COUNTRIES },
          description: "Filter orders by country",
        },
        {
          in: "query",
          name: "status",
          schema: { type: "string", enum: ORDER_STATUS },
          description: "Filter orders by status",
        },
        {
          in: "query",
          name: "order_by",
          schema: { type: "string", enum: ["id", "user"] },
          description: "Sort orders by a field ",
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
                      addressLine1: "Lorem Ipsum",
                      addressLine2: "-",
                      city: "Ankara",
                      state: "Ankara",
                      country: "TR",
                      postalCode: "06000",
                      status: "pending",
                      createdAt: "2023-09-05T17:01:21.373Z",
                      updatedAt: "2023-09-05T17:01:21.373Z",
                      userId: 1,
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
      summary: `Authenticated users can retrieve a specific order by specifying its ID in the request path.`,
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
      summary: `This endpoint enables authenticated users to update the status of a specific order by specifying its ID in the request path. `,
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
