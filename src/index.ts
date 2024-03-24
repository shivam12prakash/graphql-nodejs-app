import express from 'express'
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4"
import { graphql, graphqlSync } from 'graphql';

async function init() {
    const app = express();

const PORT = Number(process.env.PORT || 8000)
app.use(express.json())

//Creating GRAPHQL Server
const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    `,
    resolvers: {
        Query: {
            hello: () => `Hey I am a graphql server`,
            say: (_,{name}: {name: String}) => `Hey ${name} !!!`
        }
    }
})

await gqlServer.start()

app.get('/',(req, res) => {
    res.json({message: `Hi`})
})

app.use("/graphql", expressMiddleware(gqlServer))


app.listen(PORT, () =>  console.log(`Server is us on the PORT ${PORT}`))
}
init()