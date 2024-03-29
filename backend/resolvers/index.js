import {mergeResolvers} from '@graphql-tools/merge'
import userResolver from './userResolver.js'
import transactionResolver from './transactionResolver.js'
const mergeResolver=mergeResolvers([userResolver,transactionResolver])

export default mergeResolver;