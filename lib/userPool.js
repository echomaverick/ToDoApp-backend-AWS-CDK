const cdk = require("aws-cdk-lib");
const cognito = require("aws-cdk-lib/aws-cognito");
const { Construct } = require("constructs");

class CognitoUserPoolStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "aws-user-pool", {
      userPoolName: "cdk-user-pool",
      signInAliases: {
        username: true,
      },
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          mutable: false,
          required: true,
        },
        familyName: {
          mutable: false,
          required: true,
        },
        preferredUsername: {
          mutable: false,
          required: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
    });

    const appClient = userPool.addClient("Proventus Nexus", {
      userPoolClientName: "Proventus Nexus",
      authFlows: {
        userPassword: true,
      },
    });
  }
}

module.exports = { CognitoUserPoolStack };
