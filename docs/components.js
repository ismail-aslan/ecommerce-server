module.exports = {
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "An integer id",
            example: 0,
          },
          username: {
            type: "string",
            description: "Username",
            example: "user_name",
          },
          token: {
            type: "string",
            nullable: true,
            description: "The status of the todo",
            example: null,
          },
        },
      },
      //   Todo: {
      //     type: "object",
      //     properties: {
      //       id: {
      //         type: "string",
      //         description: "Todo identification number",
      //         example: "ytyVgh",
      //       },
      //       title: {
      //         type: "string",
      //         description: "Todo's title",
      //         example: "Coding in JavaScript",
      //       },
      //       completed: {
      //         type: "boolean",
      //         description: "The status of the todo",
      //         example: false,
      //       },
      //     },
      //   },
      //   TodoInput: {
      //     type: "object",
      //     properties: {
      //       title: {
      //         type: "string",
      //         description: "Todo's title",
      //         example: "Coding in JavaScript",
      //       },
      //       completed: {
      //         type: "boolean",
      //         description: "The status of the todo",
      //         example: false,
      //       },
      //     },
      //   },
      //   Error: {
      //     type: "object",
      //     properties: {
      //       message: {
      //         type: "string",
      //       },
      //       internal_code: {
      //         type: "string",
      //       },
      //     },
      //   },
    },
  },
};
