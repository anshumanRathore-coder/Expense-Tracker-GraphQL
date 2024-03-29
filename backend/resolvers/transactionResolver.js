import Transaction from "../models/transactionModal.js";

const transactionResolver={
    Query:{
        transactions:async(_,__,context)=>{
            try {
                const user=await context.getUser();
                if(!user)throw new Error("Unautherized user");
                const userId=user.id;
                const allTransactions=await Transaction.find({userId})
                console.log('allTransactions',allTransactions)
                return allTransactions;
            } catch (error) {
                console.log("Error in fetching all transactinos",error);
                throw new Error("Error in fetching all transactions");
            }
        },
        transaction:async(_,{transactionId},context)=>{
            try {
                const existingTransaction=await Transaction.findById(transactionId)
                return existingTransaction;
            } catch (error) {
                console.log("Error in fetching id transactions",error);
                throw new Error("Error in fetching id transactions");
            }
        },
    },
    Mutation:{
        createTransaction:async(_,{input},context)=>{
            try {
                const user=await context.getUser();
                if(!user)throw new Error("Unautherized user");
                const userId=user.id;
                const newTransaction=new Transaction({
                    ...input,
                    userId
                })
                await newTransaction.save()
                return newTransaction;
            } catch (error) {
                console.log("Error in creating transactions",error);
                throw new Error("Error in creating transactions");
            }
        },
        updateTransaction:async(_,{input},context)=>{
            try {
               const updatedTransaction=await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true});
               console.log('updatedTransaction',updatedTransaction)
               return updatedTransaction
            } catch (error) {
                console.log("Error in updating transactions from server",error);
                throw new Error("Error in updating transactions");
            }
        },
        deleteTransaction:async(_,{transactionId},context)=>{
            try {
               const deletedTransaction=await Transaction.findByIdAndDelete(transactionId);
               return deletedTransaction
            } catch (error) {
                console.log("Error in deleting transactions",error);
                throw new Error("Error in deleting transactions");
            }
        }
    },
}

export default transactionResolver