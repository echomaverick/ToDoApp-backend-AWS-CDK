#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const { ToDoServerlessCDK } = require("../lib/todo-cdk-serverless-stack");
const { CognitoUserPoolStack } = require("../lib/userPool");

const app = new cdk.App();
const cognitoUserPool = new CognitoUserPoolStack(app, 'CognitoUserPoolStack', {});
new ToDoServerlessCDK(app, "ToDoServerlessCDK", {
    cognitoUserPool: cognitoUserPool
});
