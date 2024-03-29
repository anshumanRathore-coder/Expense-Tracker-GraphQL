import dotenv from 'dotenv'
import {ApolloServer} from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import express from 'express';
import passport from 'passport';
import session from 'express-session'
import connectMongo from 'connect-mongodb-session'
import mergeResolver from './resolvers/index.js'
import mergeTypes from './typeDefs/index.js'
import { connectToDatabase } from './db.js';
import {buildContext} from 'graphql-passport';
import { configurePassport } from './passport/passport.config.js';

dotenv.config();
configurePassport();
const app=express()
const httpServer=http.createServer(app);
const MongoDbStrore=connectMongo(session)
const store=new MongoDbStrore({
  uri:process.env.MONGODB_URI,
  collection:"session"
})
store.on("error",err=>console.log(err))
app.use(
  session({
    secret:process.env.SECREAT_KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:100*60*60*24*7,
      httpOnly:true
    },
    store:store
  })
)

app.use(passport.initialize());
app.use(passport.session());
const server=new ApolloServer({
    typeDefs:mergeTypes,
    resolvers:mergeResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await server.start()
app.use(
    '/graphql',
    cors({
      origin:'http://localhost:5173',
      credentials:true
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req ,res}) => buildContext({req,res}),
    }),
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  await connectToDatabase();
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

















// import express from "express";
// import http from "http";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import passport from "passport";
// import session from "express-session";
// import connectMongo from "connect-mongodb-session";

// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// import { buildContext } from "graphql-passport";

// import mergedResolver from "./resolvers/index.js";
// import mergedTypes from "./typeDefs/index.js";

// import { connectToDatabase } from "./db.js";
// import { configurePassport } from "./passport/passport.config.js";

// // import job from "./cron.js";

// dotenv.config();
// configurePassport();

// // job.start();

// const __dirname = path.resolve();
// const app = express();

// const httpServer = http.createServer(app);

// const MongoDBStore = connectMongo(session);

// const store = new MongoDBStore({
// 	uri: process.env.MONGO_URI,
// 	collection: "sessions",
// });

// store.on("error", (err) => console.log(err));

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false, // this option specifies whether to save the session to the store on every request
// 		saveUninitialized: false, // option specifies whether to save uninitialized sessions
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 24 * 7,
// 			httpOnly: true, // this option prevents the Cross-Site Scripting (XSS) attacks
// 		},
// 		store: store,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

// const server = new ApolloServer({
// 	typeDefs: mergedTypes,
// 	resolvers: mergedResolver,
// 	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// // Ensure we wait for our server to start
// await server.start();

// // Set up our Express middleware to handle CORS, body parsing,
// // and our expressMiddleware function.
// app.use(
// 	"/graphql",
// 	cors({
// 		origin: "http://localhost:3000",
// 		credentials: true,
// 	}),
// 	express.json(),
// 	// expressMiddleware accepts the same arguments:
// 	// an Apollo Server instance and optional configuration options
// 	expressMiddleware(server, {
// 		context: async ({ req, res }) => buildContext({ req, res }),
// 	})
// );

// // npm run build will build your frontend app, and it will the optimized version of your app
// app.use(express.static(path.join(__dirname, "frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
// });

// // Modified server startup
// await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// await connectToDatabase();

// console.log(`🚀 Server ready at http://localhost:4000/graphql`);