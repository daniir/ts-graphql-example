import startApolloServer from "./server";
import { config } from './config/config';

async function main(){
    const app = await startApolloServer();
    const port = config.port;
    app.listen(
        port, () => {
            console.log(`Server running on port ${port}`)
        },
    );
}

main();