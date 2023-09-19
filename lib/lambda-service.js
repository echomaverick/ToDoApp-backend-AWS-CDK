const cdk = require("aws-cdk-lib");
const { Construct } = require("constructs");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const s3 = require("aws-cdk-lib/aws-s3");
const path = require("path");
const { LambdaInsightsVersion } = require("aws-cdk-lib/aws-lambda");
class LambdaService extends Construct {
  constructor(scope, id) {
    super(scope, id);
    const bucket = new s3.Bucket(this, "ToDoLambdaFunctionTest");
    const loginUserFunction = new NodejsFunction(this, "LoginUserFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/users/loginUser.js"),
      handler: "loginUser",
    });


    //user functions
    const createUserFunction = new NodejsFunction(this, "CreateUserFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/users/createUser.js"),
      handler: "createUser",
    });

    const updateUserFunction = new NodejsFunction(this, "UpdateUserFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/users/updateUser.js"),
      handler: "updateUser",
    });

    const deleteUserFunction = new NodejsFunction(this, "DeleteUserFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/users/deleteUser.js"),
      handler: "deleteUser",
    });


    //task functions
    const createTaskFunction = new NodejsFunction(this, "CreateTaskFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/tasks/createTask.js"),
      handler: "createTask",
    });

    const updateTaskFuncton = new NodejsFunction(this, "UpdateTaskFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/tasks/updateTask.js"),
      handler: "updateTask",
    });

    const deleteTaskFunction = new NodejsFunction(this, "DeleteTaskFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/tasks/deleteTask.js"),
      handler: "deleteTask",
    });

    const getTaskByIdFunction = new NodejsFunction(
      this,
      "GetTaskByIdFunction",
      {
        runtime: cdk.aws_lambda.NODEJS_18_X,
        entry: path.join(__dirname, "../resources/tasks/getTaskById.js"),
        handler: "getTaskById",
      }
    );

    const getTaskForUserByUsernameFunction = new NodejsFunction(this, "GetTaskForUserByUsername", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/tasks/getTasksForUserByUsername.js"),
      handler: "getTasksForUserByUsername"
    });


    //role function
    const getAllRolesFunction = new NodejsFunction(this, "GetAllRolesFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/roles/getAllRoles.js"),
      handler: "getAllRoles",
    });

    //project functions
    const createProjectFunction = new NodejsFunction(this, "CreateProjectFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/projects/createProject.js"),
      handler: "createProject",
    });

    const updateProjectFunction = new NodejsFunction(this, "UpdateProjectFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/projects/updateProject.js"),
      handler: "updateProject"
    });

    const deleteProjectFunction = new NodejsFunction(this, "DeleteProjectFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/projects/deleteProject.js"),
      handler: "deleteProject"
    });

    const getProjectByIdFunction = new NodejsFunction(this, "GetProjectByIdFunction", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/projects/getProjectById.js"),
      handler: "getProjectById"
    });

    const getProjectForUserByUsernameFunction = new NodejsFunction(this, "GetProjectForUserByUsername", {
      runtime: cdk.aws_lambda.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/projects/getProjectsForUserByUsername.js"),
      handler: "getProjectsForUserByUsername"
    });

    //api gateway
    const api = new apigateway.RestApi(this, "todoapp-api-test", {
      restApiName: "todoapp-api-test",
      description: "This is a test for the aws cdk",
    });

    //user resources
    const authResource = api.root.addResource("auth");
    const loginResource = authResource.addResource("login");
    const userResource = api.root.addResource("users");
    const createUserResource = userResource.addResource("create-account");
    const updateUserResource = userResource.addResource("update-profile");
    const deletUserResource = userResource.addResource("delete-profile");
    const deleteByUsernameResource = deletUserResource.addResource("{username}");

    //task resources
    const taskResource = api.root.addResource("tasks");
    const userTaskResource = api.root.addResource("user-tasks")
    const updateTaskResource = taskResource.addResource("update-task");
    const updateTaskResourceByID = updateTaskResource.addResource("{id}");
    const deleteTaskResource = taskResource.addResource("delete-task");
    const deleteTaskResourceById = deleteTaskResource.addResource("{id}");
    const getTaskByIdResource = taskResource.addResource("{id}");
    const getTaskForUserByUsernameResource = userTaskResource.addResource("{username}");

    //role resources
    const roleResource = api.root.addResource("roles");

    //project resources
    const projectResource = api.root.addResource("projects");
    const updateProjectResoure = projectResource.addResource("update-project");
    const updateProjectResoureById = updateProjectResoure.addResource("{id}");
    const deleteProjectResource = projectResource.addResource("delete-project");
    const deleteProjectResourceById = deleteProjectResource.addResource("{id}");
    const getProjectByIdResource = projectResource.addResource("{id}");
    const userProjectResource = api.root.addResource("user-projects")
    const getProjectForUserByUsernameResource = userProjectResource.addResource("{username}");


    //user integration
    const getTestIntegrationLogin = new apigateway.LambdaIntegration(
      loginUserFunction,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    loginResource.addMethod("POST", getTestIntegrationLogin);

    const getTestIntegrationUsers = new apigateway.LambdaIntegration(
      createUserFunction,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    createUserResource.addMethod("POST", getTestIntegrationUsers);

    const getTestIntegrationUpdate = new apigateway.LambdaIntegration(
      updateUserFunction,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    updateUserResource.addMethod("PUT", getTestIntegrationUpdate);

    const getTestIntegrationDelete = new apigateway.LambdaIntegration(
      deleteUserFunction,
      {
        requestTemplates: { "application/json": '{"statusCode": 200 }' },
      }
    );
    deleteByUsernameResource.addMethod("DELETE", getTestIntegrationDelete);


    //task integration
    const getTestIntegrationTask = new apigateway.LambdaIntegration(
      createTaskFunction,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    taskResource.addMethod("POST", getTestIntegrationTask);

    const getTestIntegrationTaskUpdate = new apigateway.LambdaIntegration(
      updateTaskFuncton,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    updateTaskResourceByID.addMethod("PUT", getTestIntegrationTaskUpdate);

    const getTestIntegrationTaskDelete = new apigateway.LambdaIntegration(
      deleteTaskFunction,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    deleteTaskResourceById.addMethod("DELETE", getTestIntegrationTaskDelete);

    const getTestIntegrationTaskGetById = new apigateway.LambdaIntegration(
      getTaskByIdFunction,
      {
        requestTemplates: { "application/json": '{"statusCode: 200"}' },
      }
    );
    getTaskByIdResource.addMethod("GET", getTestIntegrationTaskGetById);

    const getTestIntegrationTaskGetTaskForUser = new apigateway.LambdaIntegration(
      getTaskForUserByUsernameFunction,{
        requestTemplates: {"application/json": '{"statusCode: 200"}'},
      }
    );
    getTaskForUserByUsernameResource.addMethod("GET", getTestIntegrationTaskGetTaskForUser);


    //role integration
    const getTestIntegrationRole = new apigateway.LambdaIntegration(
      getAllRolesFunction,{
        requestTemplates: {"application/json": '{"statusCode: 200"}'},
      }
    );
    roleResource.addMethod("GET", getTestIntegrationRole);

    //project integration
    const getTestIntegrationProjectCreate = new apigateway.LambdaIntegration(
      createProjectFunction, {
        requestTemplates: {"application/json": '{"statusCode: 200"}'},
      }
    );
    projectResource.addMethod("POST", getTestIntegrationProjectCreate);

    const getTestIntegrationProjectUpdate = new apigateway.LambdaIntegration(
      updateProjectFunction,{
        requestTemplates: {"application/json": '{"statusCode: 200"}'},
      }
    );
    updateProjectResoureById.addMethod("PUT", getTestIntegrationProjectUpdate);

    const getTestIntegrationProjectDelete = new apigateway.LambdaIntegration(
      deleteProjectFunction, {
        requestTemplates: {"application/json": '{"statusCode: 200}'},
      }
    );
    deleteProjectResourceById.addMethod("DELETE", getTestIntegrationProjectDelete);

    const getTestIntegrationProjectGetById = new apigateway.LambdaIntegration(
      getProjectByIdFunction, {
        requestTemplates: {"application/json": '{"statusCode: 200"}'},
      }
    );
    getProjectByIdResource.addMethod("GET", getTestIntegrationProjectGetById);

    const getTestIntegrationTaskGetProjectForUser = new apigateway.LambdaIntegration(
      getProjectForUserByUsernameFunction,{
        requestTemplates: {"application/json": '{"statusCode: 200"}'},
      }
    );
    getProjectForUserByUsernameResource.addMethod("GET", getTestIntegrationTaskGetProjectForUser);
  }
}

module.exports = { LambdaService };
