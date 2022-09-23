const AWS = require("aws-sdk");
// import { AWS } from 'aws-sdk'
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid')

module.exports.createTodo = (event, context, callback) => {

    const timestamp = new Date().getTime()
    const data = JSON.parse(event.body)

    if(typeof data.todo !== 'string') {
        console.error('Validacao falha')
        return
    }

    const params = {

        TableName: TODO_TABLE,
        Item: {
            userId: uuid.v1(),
            todo: data.todo,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }


    dynamoDb.put(params, (err, data) => {
        if(err) {
            console.log(err)
            callback(new Error(err))
        }
        const response = {

            statusCode: 200,
            body: JSON.stringify(data.Item)
        }

        callback(null, response)
    })
    
   
}