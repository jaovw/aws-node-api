const { DynamoDB } = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new DynamoDB.DocumentClient();

module.exports.updateTodo = async (event) => {
  
  const datetime = new Date().toISOString()
  const data = JSON.parse(event.body)
  let response

  if (!data.todo || !data.checked) {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Falta de atributos na request ...'
      })
    }
    return response
  }

  if (typeof data.todo !== 'string' || typeof data.checked !== 'boolean') {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Erro de validacao da request ...'
      })
    }
    return response
  }

  const params = {
    TableName: TODO_TABLE,
    Key: {
      userId: event.pathParameters.userId,
    },
    ExpressionAttributeValues: {
      ":todo": data.todo,
      ":checked": data.checked,
      ":updatedAt": datetime,
    },
    UpdateExpression:
      "SET todo = :todo, checked = :checked, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  }

  await dynamoDb.update(params, (error,data) => {
    if(error){
      console.error(error)
      return
    }
    response = {
      statusCode: 200,
      body: data.Attributes
    }

  }).promise()

  return{
    statusCode: 200,
    body: JSON.stringify(response)
  }
}