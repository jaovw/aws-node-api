const { DynamoDB } = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new DynamoDB.DocumentClient();

module.exports.getTodo = async (event) => {

    const params = {
        TableName: TODO_TABLE,
        Key: {
            userId: event.pathParameters.userId
        }
    }

    const data = await dynamoDb.get(params).promise()

    const response = data.Item
    ? {
        statusCode:200,
        body: JSON.stringify(data.Item)
    }: {
        statusCode: 404,
        body: JSON.stringify({message:'Item nao encontrado'})
    }

    return response
}