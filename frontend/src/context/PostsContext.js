import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                // action.payload is all posts
                posts: action.payload
            }
        case 'SET_POST':
            return {
                // action.payload is one post
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                // action.payload.post is the new post, state.posts is past
                // representation of posts
                posts: [action.payload.post, ...Object.values(state.posts)]
            }
        case 'UPDATE_POST':
            return {
                // action.payload.post is updated post, state.posts is past
                // representation of posts
                posts: [action.payload.post, ...Object.values(state.posts).filter(post =>
                    post.postId !== action.payload.postId
                )]
            }
        case 'DELETE_POST':
            return {
                // action.payload is deleted post, state.posts is past
                // representation of posts
                posts: state.posts.filter(post =>
                    post.postId !== action.payload.postId
                )
            }
    }
}

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: []
    });

    return (
        <PostsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostsContext.Provider>
    )
}