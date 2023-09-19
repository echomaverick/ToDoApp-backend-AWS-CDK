module.exports.handler = async (event, context) => {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify("Hello from CDK"),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  };