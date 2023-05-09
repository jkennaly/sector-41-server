//Source: https://github.com/ahmedelamine/nodejs-dynamoDB/blob/main/lib/ddbDocClient.js
import dotenv from "dotenv"
dotenv.config()

import { upsertItem, getItem } from './aws/crud.js'

const TABLE_NAME = "festigram.auth.recovery"
const TABLE_KEY = "email"

export const storeRecovery = async (email, secret, callback) => {
  const item = {
    email, secret, callback
  }
  const newItem = await upsertItem(item, TABLE_NAME, TABLE_KEY)
  return newItem
}

export const validRecovery = async (email, secret) => {

  const { Item } = await getItem(email, TABLE_NAME, TABLE_KEY)
  return Item && Item.secret === secret && Item.callback

}

export const clearRecovery = async (email) => {
  const item = {
    email, secret: '', callback: ''
  }
  const newItem = await upsertItem(item, TABLE_NAME, TABLE_KEY)
  return newItem
}


