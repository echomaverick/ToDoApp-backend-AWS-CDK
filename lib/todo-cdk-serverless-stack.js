const { Stack, Duration } = require('aws-cdk-lib');
const lambda_service = require('../lib/lambda-service');
const { CognitoUserPoolStack } = require('./userPool');

class ToDoServerlessCDK extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new lambda_service.LambdaService(this, 'Lambda_Service',);

    new CognitoUserPoolStack(this, "CognitoUserPoolStack");
  }
}

module.exports = { ToDoServerlessCDK }