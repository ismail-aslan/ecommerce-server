module.exports = {
  "/payment": {
    get: {
      summary: `This endpoint, categorized under "Payments," allows authenticated users to create a Stripe checkout session.`,
      tags: ["Payments"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [],
      responses: {
        200: {
          description:
            "Successful response with checkout session url. You can try [STRIPE TEST CARDS](https://stripe.com/docs/testing?testing-method=card-numbers#cards).",
          content: {
            "application/json": {
              example: {
                status: "success",
                data: "https://session_url",
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
  "/payment/process-payment": {
    post: {
      summary: `This "Payments" endpoint is a webhook that listens to Stripe events.`,
      tags: ["Payments"],

      parameters: [
        {
          in: "header",
          name: "stripe-signature",
          required: true,
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {},
        },
      },
      externalDocs: {
        description: "Learn more about Stripe webhooks from documentations.",
        url: "https://stripe.com/docs/webhooks",
      },
    },
  },
};
