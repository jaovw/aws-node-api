const { DynamoDB } = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new DynamoDB.DocumentClient();

module.exports.deleteTodo = async (event) => {

    const params = {
        TableName: TODO_TABLE,
        Key: {
            userId: event.pathParameters.userId
        }
    }

    const data = await dynamoDb.get(params).promise()

    const response = data.Item ? {
        statusCode: 200,
        body: JSON.stringify({
            message: `Objeto ${params.Key.userId} deletado com sucesso`
        })
        
    }: {
        statusCode: 404,
        body: JSON.stringify({
            message: `Objeto  nao encontrado ... `
        })
    }

    response.statusCode == 200 ? await dynamoDb.delete(params).promise(): response

    return response
}