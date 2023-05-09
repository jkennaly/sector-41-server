//Source: https://github.com/ahmedelamine/nodejs-dynamoDB/blob/main/lib/ddbDocClient.js
import dotenv from "dotenv"
dotenv.config()

import dbClient from "./dbClient.js"
import ddbDocClient from "./ddbDocClient.js"
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb"
import {
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
    QueryCommand,
    ScanCommand,
 } from "@aws-sdk/lib-dynamodb"

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
export const getItem = async (value, TableName, keyField) => {
    const params = {
        TableName,
        Key: { [keyField]: value },
    };
    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        //console.log("Success - item retrieved", data);
        return data
    } catch (err) {
        console.log("Error", err);
        throw err
    }
}

export const createItem = async (Item, TableName) => {
    const params = {
        TableName,
        Item
    };
    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        //console.log("Success - item added or updated", data);
        return data
    } catch (err) {
        console.log("Error", err);
        throw err
    }
}

export const upsertItemOld = async (Item, TableName, keyField) => {
    const params = {
        TableName,
        Key: { [keyField]: { S: Item[keyField] } },
        UpdateExpression: "SET latestUpdate = :updateTime",
        ExpressionAttributeValues: {
            ":updateTime": { N: Date.now() }
        }
    };
    for (let k in Item) {
        if (k !== keyField) {
            params.UpdateExpression += `, ${k} = :${k}`
            params.ExpressionAttributeValues[`:${k}`] = { S: JSON.stringify(Item[k]) }
        }
    }
    //console.log("params", params)
    try {
        const data = await ddbDocClient.send(new UpdateCommand(params));
        //console.log("Success - item added or updated", data);
        return data
    } catch (err) {
        console.log("Error", err);
        throw err
    }
}

/**
 * Update item in DynamoDB table
 * @param {string} tableName // Name of the target table
 * @param {object} key // Object containing target item key(s)
 * @param {object} item // Object containing updates for target item
 */
export const upsertItem = async (item, tableName, keyField) => {
    const itemKeys = Object.keys(item).filter(k => k !== keyField);
    const key = { [keyField]: item[keyField] }

    // When we do updates we need to tell DynamoDB what fields we want updated.
    // If that's not annoying enough, we also need to be careful as some field names
    // are reserved - so DynamoDB won't like them in the UpdateExpressions list.
    // To avoid passing reserved words we prefix each field with "#field" and provide the correct
    // field mapping in ExpressionAttributeNames. The same has to be done with the actual
    // value as well. They are prefixed with ":value" and mapped in ExpressionAttributeValues
    // along witht heir actual value

    const params = {
        TableName: tableName,
        Key: marshall(key),
        ReturnValues: 'ALL_NEW',
        UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(', ')}`,
        ExpressionAttributeNames: itemKeys.reduce((accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }), {}),
        ExpressionAttributeValues: itemKeys.reduce((accumulator, k, index) => ({ ...accumulator, [`:value${index}`]: { S: item[k] } }), {}),
    }
    //console.log("params", params)

    const { Attributes } = await dbClient.send(new UpdateItemCommand(params));

    return unmarshall(Attributes);
};
