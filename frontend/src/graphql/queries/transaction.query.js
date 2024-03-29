import { gql} from '@apollo/client';

export const GET_ALL_TRANSACTIONS=gql`
    query GetAllTransactions{
        transactions{
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`
export const GET_TRANSACTION=gql`
    query GetTransaction($id:ID!){
        transaction(transactionId:$id){
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`