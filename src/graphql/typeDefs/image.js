import { gql } from "apollo-server-express";

export default gql`
    scalar Upload

    extend type Query {
        info: String!
    }

    extend type Mutation {
        imageUploader(file: Upload!): File!
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
`;
