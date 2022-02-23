import express from "express";
import { success, error } from "consola";
import { PORT, IN_PROD, DB } from "./config";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql";
import mongoose from "mongoose";
import * as AppModels from './models';
import { graphqlUploadExpress } from "graphql-upload";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        ...AppModels
    },
});

const startApp = async () => {
    try {
        await mongoose.connect(DB);
        success({
            badge: true,
            message: "Successfully connect to database",
        });

        await server.start();
        app.use(graphqlUploadExpress());
        server.applyMiddleware({ app });

        app.listen(PORT, () =>
            success({ message: `Server started on PORT ${PORT}`, badge: true })
        );
    } catch (err) {
        error({
            message: err.message,
            badge: true,
        })
    }
};

startApp();
