const transactionTypedef = `#graphql
    type Transaction {
        _id: ID!
        userId: String!
        description: String!
        paymentType: String!
        category: String!
        amount:Float!
        location: String!
        date: String!
    }
    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }
    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }
    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
    }
    input UpdateTransactionInput {
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String,
        transactionId:ID!
    }
`;

export default transactionTypedef;
