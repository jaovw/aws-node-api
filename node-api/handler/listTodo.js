const { DynamoDB } = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new DynamoDB.DocumentClient();

module.exports.listTodo = async (event) => {

    const data = await dynamoDb.scan({
        TableName: TODO_TABLE
    }).promise()

    return{
        statusCode: 200,
        body: JSON.stringify(data.Items)
    }
}


