module.exports = {
  "/products": {
    get: {
      summary: "Get products",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "Search query for products",
        },
        {
          name: "category",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "Category name for filtering products",
        },
        {
          name: "isListed",
          in: "query",
          required: false,
          schema: {
            type: "boolean",
          },
          description: "Filter products by listing status",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "integer",
            enum: [1, 2, 10, 20, 30],
          },
          description: "Number of products to retrieve",
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
          description: "Successful response with product list",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  count: 3,
                  products: [
                    {
                      images: [],
                      id: 123,
                      title: "Product 1",
                      price: 19.99,
                      prevPrice: 29.99,
                      unitCount: 5,
                      soldCount: 10,
                      isListed: true,
                      showDiscount: true,
                      description: "This is a fantastic product.",
                      stripeProductId: "prod_ABC123",
                      stripePriceId: "price_XYZ456",
                      createdAt: "2023-08-19T12:34:56.789Z",
                      updatedAt: "2023-08-20T09:12:34.567Z",
                      categories: [
                        {
                          id: 1,
                          name: "Electronics",
                        },
                        {
                          id: 3,
                          name: "Gadgets",
                        },
                      ],
                    },
                    {
                      images: [],
                      id: 234,
                      title: "Product 2",
                      price: 39.99,
                      prevPrice: null,
                      unitCount: 0,
                      soldCount: 2,
                      isListed: false,
                      showDiscount: false,
                      description: "An innovative and stylish item.",
                      stripeProductId: "prod_DEF456",
                      stripePriceId: "price_WXY789",
                      createdAt: "2023-08-19T10:00:00.000Z",
                      updatedAt: "2023-08-19T15:30:00.000Z",
                      categories: [
                        {
                          id: 2,
                          name: "Fashion",
                        },
                      ],
                    },
                    {
                      images: [],
                      id: 345,
                      title: "Product 3",
                      price: 9.99,
                      prevPrice: 14.99,
                      unitCount: 8,
                      soldCount: 5,
                      isListed: true,
                      showDiscount: true,
                      description: "A must-have for every home.",
                      stripeProductId: "prod_GHI789",
                      stripePriceId: "price_ABC123",
                      createdAt: "2023-08-18T18:45:12.345Z",
                      updatedAt: "2023-08-20T08:45:12.345Z",
                      categories: [
                        {
                          id: 1,
                          name: "Home Decor",
                        },
                        {
                          id: 4,
                          name: "Kitchen",
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
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                status: "error",
                message: "An internal server error occurred",
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create product",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProductInput",
            },
            example: {
              title: "Product Title",
              price: 100.0,
              showDiscount: false,
              description: "Product description",
              unitCount: 10,
              isListed: true,
              categoryIds: [1, 2],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  id: 3,
                  title: "Product Title",
                  price: 100.0,
                  showDiscount: false,
                  description: "Product description",
                  unitCount: 10,
                  isListed: true,
                  categories: [
                    {
                      id: 1,
                      name: "Category A",
                    },
                    {
                      id: 2,
                      name: "Category B",
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
    patch: {
      summary: "Update product",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProductUpdateInput",
            },
            example: {
              id: 1,
              title: "Updated Product Title",
              price: 99.99,
              showDiscount: true,
              description: "Updated product description",
              unitCount: 5,
              isListed: true,
              categoryIds: [1, 2],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated successfully",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  images: [],
                  id: 1,
                  title: "Updated Product Title",
                  price: 99.99,
                  prevPrice: null,
                  unitCount: 5,
                  soldCount: 2,
                  isListed: true,
                  showDiscount: true,
                  description: "Updated product description",
                  stripeProductId: "prod_OTpWynh2xWqCxG",
                  stripePriceId: "price_1NguXeHdmq6yBIEd1WQCimPe",
                  createdAt: "2023-08-19T16:19:01.333Z",
                  updatedAt: "2023-08-20T12:00:00.000Z",
                  categories: [
                    {
                      id: 1,
                      name: "home",
                    },
                    {
                      id: 2,
                      name: "garden",
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
  "/products/{id}/image": {
    patch: {
      summary: "Update product image by ID",
      tags: ["Products"],
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
          description: "Product ID",
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                unchangedImgs: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Array of unchanged image URLs",
                },
                productImage: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  description: "Array of new images to upload (png, jpg, jpeg)",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          status: "success",
          data: {
            images: [],
            id: 3,
            title: "Example Product 3",
            price: 9.99,
            prevPrice: null,
            unitCount: 5,
            soldCount: 2,
            isListed: true,
            showDiscount: false,
            description: "This is an example product description.",
            stripeProductId: "example_stripe_product_id_3",
            stripePriceId: "example_stripe_price_id_3",
            createdAt: "2023-08-19T16:19:26.317Z",
            updatedAt: "2023-08-19T21:29:14.683Z",
            categories: [
              {
                id: 1,
                name: "example_category_1",
              },
            ],
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
  "/products/{id}": {
    get: {
      summary: "Get product by ID",
      tags: ["Products"],
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
          description: "Product ID",
        },
      ],
      responses: {
        200: {
          description: "Successful response with product details",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: {
                  id: 3,
                  title: "Product Title",
                  price: 100.0,
                  prevPrice: null,
                  unitCount: 10,
                  soldCount: 2,
                  isListed: true,
                  showDiscount: false,
                  description: "Product description",
                  stripeProductId: "prod_OTpWynh2xWqCxG",
                  stripePriceId: "price_1NguXeHdmq6yBIEd1WQCimPe",
                  createdAt: "2023-08-19T16:19:01.333Z",
                  updatedAt: "2023-08-19T21:44:25.325Z",
                  categories: [
                    {
                      id: 1,
                      name: "home",
                    },
                    {
                      id: 2,
                      name: "garden",
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
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    delete: {
      summary: "Delete product by ID",
      tags: ["Products"],
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
          description: "Product ID",
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
  "/list/{id}": {
    get: {
      summary: "List a product by ID",
      tags: ["Products"],
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
          description: "ID of the product to be listed",
        },
      ],
      responses: {
        200: {
          description: "Successful response with warnings",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: ["No product description.", "No product image uploaded."],
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
          $ref: "#/components/responses/ServerError",
        },
      },
    },
  },
  "/delist/{id}": {
    get: {
      summary: "Delist a product by ID",
      tags: ["Products"],
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
          description: "ID of the product to be delisted",
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
        500: {
          $ref: "#/components/responses/ServerError",
        },
      },
    },
  },
};
