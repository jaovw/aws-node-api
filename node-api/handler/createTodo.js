const { DynamoDB } = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new DynamoDB.DocumentClient();
const uuid = require('uuid')

module.exports.createTodo = async (event) => {

    const timestamp = new Date().getTime()
    const data = JSON.parse(event.body)
    // DEVIDO AS DEFINICOES NO .YML COM KEYS JA CONFIGURADAS, NECESSARIO USAR O USERID 
    const newItem = {
        userId: uuid.v1(),
        todo: data.todo,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp
    }

    if(typeof data.todo !== 'string') {
        console.error('Validacao falha')
        return
    }

    await dynamoDb.put({
        TableName: TODO_TABLE,
        Item: newItem
    }).promise()
    
    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
    
   
}