import User from "../models/userModal.js";
import bycrptjs from 'bcryptjs'
const userResolver={
    Mutation:{
        signUp:async(_,{input},context)=>{
            try {
                const {name ,username,password,gender}=input;
                if(!name || !username || !password || !gender)throw new Error('All fields are ewquired')
                const existingUser=await User.findOne({username});
                if(existingUser)throw new Error('User already exists')
                const salt=await bycrptjs.genSalt(10);
                const hashPassword=await bycrptjs.hash(password,salt);
                const malePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
                const femalePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
                const newUser=new User({
                    name,
                    username,
                    password:hashPassword,
                    gender,
                    profilePicture:gender==='male'?malePic:femalePic
                })
                await newUser.save();
                await context.login(newUser)
                return newUser;
            } catch (error) {
                console.log("Error in signup",error)
                throw new Error('Some error occured in signup')
            }
        },

        login:async(_,{input},context)=>{
            try {
                const {username,password}=input
                const {user}=await context.authenticate("graphql-local", { username, password });
                await context.login(user)
                return user;
            } catch (error) {
                console.log('Error in login',error)
                throw new Error('Some error occured in login')
            }
        },

        logout:async(_,__,context)=>{
            try {
                await context.logout();
                context.req.session.destroy((err)=>{
                    if(err)throw new Error('Some error occured in logout')
                })
                context.res.clearCookie('connect.sid')
                return {message:"Logout from application successfully"}
            } catch (error) {
                console.log(error);
                throw new Error('Some error occured in logout')
            }
        }
    },
    Query:{
        authUser:async(_,{},context)=>{
            try {
                const user=await context.getUser();
                return user;
            } catch (error) {
                console.log('Error in geting user',error);
                throw new Error("Error in getting user");
            }
        },
        user:async(_,{userId})=>{
            try {
                const user=await User.findById(userId);
                return user;
            } catch (error) {
                console.log('Error in geting user by id',error);
                throw new Error("Error in getting user by id");
            }
        }
    }
}

export default userResolver