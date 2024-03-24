import express from 'express'
import {expressMiddleware} from "@apollo/server/express4"
import createApolloGraphqlServer from './graphql';
import UserService from './services/user';

async function init() {
    const app = express();

const PORT = Number(process.env.PORT || 8000)
app.use(express.json())

app.get('/',(req, res) => {
    res.json({message: `Hi`})
})

app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()), {context: async ({ req }: any) => {
    return {
        // @ts-ignore
        const token = req.headers["token"]
        try {
            const user = UserService.decodeJWTToken(token as string);
            return { user }
        }
        catch (err : any) {
            return {}
        }
    }
}})

app.listen(PORT, () =>  console.log(`Server is us on the PORT ${PORT}`))

}
init()