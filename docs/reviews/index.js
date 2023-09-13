module.exports = {
  "/reviews/{productId}": {
    get: {
      summary:
        "Retrieve a paginated list of reviews for a specific product by providing the product ID in the request path.",
      tags: ["Reviews"],
      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Product ID",
        },
        {
          name: "order_by",
          in: "query",
          required: false,
          schema: {
            type: "string",
            enum: ["rating", "createdAt", "likeCount", "dislikeCount"],
          },
          default: "likeCount",
          description: "Order reviews",
        },
        {
          name: "desc",
          in: "query",
          required: false,
          schema: {
            type: "boolean",
          },
          description: "Sort reviews in descending order",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "integer",
            enum: [1, 2, 10, 20, 30],
          },
          description: "Number of reviews to retrieve",
        },
        {
          name: "offset",
          in: "query",
          required: false,
          schema: {
            type: "integer",
          },
          description: "Offset for paginated results",
        },
      ],
      responses: {
        200: {
          description: "Successful response with review list",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  reviews: [
                    {
                      id: 1,
                      showFullName: true,
                      displayName: "Name Surname",
                      rating: 4,
                      content: "Review content 1",
                      createdAt: "2023-08-31T05:55:40.507Z",
                      updatedAt: "2023-08-31T05:55:40.507Z",
                      userId: 6,
                      productId: 2,
                      likeCount: "432",
                      dislikeCount: "23",
                    },
                    {
                      id: 2,
                      showFullName: false,
                      displayName: "N*** S***",
                      rating: 2,
                      content: "Review content 2",
                      createdAt: "2023-08-31T05:55:40.507Z",
                      updatedAt: "2023-08-31T05:55:40.507Z",
                      userId: 65,
                      productId: 875,
                      likeCount: "43",
                      dislikeCount: "408",
                    },
                    {
                      id: 3,
                      showFullName: false,
                      displayName: "N*** S***",
                      rating: 1,
                      content: "Review content 3",
                      createdAt: "2023-08-31T05:55:40.507Z",
                      updatedAt: "2023-08-31T05:55:40.507Z",
                      userId: 583,
                      productId: 43,
                      likeCount: "231",
                      dislikeCount: "21",
                    },
                  ],
                  pagination: {
                    limit: 20,
                    offset: 0,
                    total: 422,
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    post: {
      summary:
        "Allows authenticated users to create a new review for a specific product by providing the product ID in the request path and the review details via a JSON request body.",
      tags: ["Reviews"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Product ID",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ReviewInput",
            },
          },
        },
      },
      responses: {
        200: {
          status: "success",
          data: {
            id: 1,
            showFullName: false,
            displayName: "N*** S***",
            rating: 5,
            content: "Review content 4",
            productId: 345,
            userId: 1123,
            updatedAt: "2023-09-07T21:32:52.900Z",
            createdAt: "2023-09-07T21:32:52.900Z",
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        413: {
          description: "Payload Too Large",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Payload Too Large",
              },
            },
          },
        },

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
  "/reviews/can_add_review/{productId}": {
    get: {
      summary:
        "Check if the authenticated user can add a review for a specific product by providing the product ID in the request path.",
      tags: ["Reviews"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Product ID",
        },
      ],
      responses: {
        200: {
          description:
            "A boolean value indicating if the user can add a review",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: true,
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
  "/reviews/vote/{id}": {
    post: {
      summary:
        "Allows authenticated users to vote for a specific review by providing the review ID in the request path and the vote type via a JSON request body.",
      tags: ["Reviews"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Review ID",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ReviewVoteInput",
            },
          },
        },
      },
      responses: {
        200: {
          status: "success",
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        413: {
          description: "Payload Too Large",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "Payload Too Large",
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
      summary: "Allows authenticated users to delete their review vote.",
      tags: ["Reviews"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Review ID",
        },
      ],
      responses: {
        204: {
          $ref: "#/components/responses/NoContent",
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
  "/reviews/{id}": {
    patch: {
      summary:
        "Enables authenticated users to update their review by providing a JSON request body with the necessary details.",
      tags: ["Reviews"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Review ID",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ReviewInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Review updated successfully",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  id: 1205,
                  showFullName: false,
                  displayName: "N*** S***",
                  rating: "5",
                  content: "Updated review content",
                  createdAt: "2023-09-05T21:51:45.533Z",
                  updatedAt: "2023-09-07T22:51:04.222Z",
                  userId: 1221,
                  productId: 5,
                  user: {
                    id: 1221,
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    delete: {
      summary: "Allows authenticated users to delete their review.",
      tags: ["Reviews"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Review ID",
        },
      ],
      responses: {
        204: {
          $ref: "#/components/responses/NoContent",
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
