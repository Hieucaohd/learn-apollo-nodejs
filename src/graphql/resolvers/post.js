export default {
    Query: {
        getAllPosts: async (_, args, { Post }, info) => {
            let posts = await Post.find();
            return posts;
        },

        getPostById: async (_, { id }, { Post }, info) => {
            let post = await Post.findById(id);
            return post;
        },
    },

    Mutation: {
        createNewPost: async (_, { newPost }, { Post }, info) => {
            let result = await Post.create(newPost);
            return result;
        },

        editPostById: async (_, { updatedPost, id }, { Post }, info) => {
            let post = await Post.findByIdAndUpdate(
                id,
                { ...updatedPost },
                { new: true }
            );
            return post;
        },

        deletePostById: async (_, { id }, { Post }, info) => {
            let post = await Post.findByIdAndDelete(id);
            return {
                id: post.id,
                message: "ok",
                success: true,
            };
        },
    },
};
