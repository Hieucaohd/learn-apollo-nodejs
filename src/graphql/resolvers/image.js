import { join, parse } from "path";
import { createWriteStream } from "fs";
import { URL } from "../../config";
import { finished } from "stream/promises";
import { GraphQLUpload } from "graphql-upload";

export default {
    Upload: GraphQLUpload,
    Query: {
        info: () => {
            return "Hello";
        },
    },

    Mutation: {
        imageUploader: async (_, { file }, context, info) => {
            const { createReadStream, filename, mimetype, encoding } =
                await file;

            let { ext, name } = parse(filename);
            name = name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_");
            let serverFile = join(
                __dirname,
                `../../uploads/${name}-${new Date()}${ext}`
            );

            const stream = createReadStream();
            const out = createWriteStream(serverFile);
            stream.pipe(out);
            await finished(out);

            return { serverFile, mimetype, encoding };
        },
    },
};
