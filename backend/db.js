import {connect,disconnect} from 'mongoose'

const connectToDatabase=async()=>{
    try {
        await connect(process.env.MONGODB_URI)
        console.log('connected to databse')
    } catch (error) {
        console.log("Error in connecting to data base",error)
    }
}

const disconnectToDatabse=async()=>{
    try {
        await disconnect(process.env.MONGODB_URI)
        console.log('disconnect to databse')
    } catch (error) {
        console.log("Error in disconnecting to data base",error)
    }
}

export {connectToDatabase,disconnectToDatabse}