import {mergeTypeDefs} from '@graphql-tools/merge'
import userTypeDef from './user.typeDef.js'
import transactionTypedef from './transaction.typeDef.js'
const mergeTypes=mergeTypeDefs([userTypeDef,transactionTypedef])

export default mergeTypes