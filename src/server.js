import{ GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "../graphql/schema"
import {authenticateJwt,isAuthenticated} from "../auth/jwt"


const server = new GraphQLServer({
schema,
context:({request})=>({request,isAuthenticated})
}); 


server.express.use(logger("dev"));
server.express.use(authenticateJwt);
export default server;