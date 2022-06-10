import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import'reflect-metadata';
import {buildSchema} from "type-graphql";
import {TaskResolver} from "./resolvers/Task";

async function startApolloServer(){
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                TaskResolver,
            ],
        }),
        csrfPrevention: true,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    });
    await server.start();
    server.applyMiddleware({app, path: '/api'});

    return app;
}

export default startApolloServer;