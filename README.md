# Ryan Holder Readable Project (reactnd-project-readable)
Readable project application for Udacity React Nanodegree

# Readable Project

This is the Readable project for Udacity's React Fundamentals course. Application was created using [Create React App](https://github.com/facebookincubator/create-react-app) and all styling components are done using [React Material-UI](https://material-ui-next.com/)

State management is handled using [Redux](https://redux.js.org/)

## Installation

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

# API Server

This application requires that you have the backend server running. The [API Server](https://github.com/ryanholder/reactnd-project-readable/tree/master/api-server) is located in the api-server folder and is a basic backend server provided by [Udacity](https://www.udacity.com/) to utilize in developing this app.

To install and start the API server, run the following commands in the api-server directory:

* `npm install`
* `node server`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── api-server # Backend Server, read README.md file in this folder for more info
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── frontend
    ├── public
    │   ├── favicon.ico # React Icon, You may change if you wish.
    │   ├── index.html # DO NOT MODIFY
    │   └── manifest.json # Provides information about the app for use on devices
    └── src
        ├── actions
        │   ├── categories.js
        │   ├── comments.js
        │   ├── posts.js
        │   └── votes.js
        ├── components
        │   ├── AddComment.js # Add comment button to add new comment
        │   ├── AddCommentForm.js # Add comment form displayed in fullscreen dialog
        │   ├── AddPost.js # Add post button to add new post
        │   ├── AddPostForm.js # Add post form displayed in fullscreen dialog
        │   ├── App.js # This is the root of your app.
        │   ├── CategorySelect.js # Select which category to view posts for, used in PostsViewNavigation.js
        │   ├── CountPostComments.js # Component to create the count badge for post comments
        │   ├── CountPostVotes.js # Component to create the count badge for post votes
        │   ├── EditCommentForm.js # Edit comment form displayed in fullscreen dialog
        │   ├── EditDeleteComment.js # Edit and delete buttons used for each comment in post
        │   ├── EditDeletePost.js # Edit and delete buttons used in both posts list and a specific post view
        │   ├── EditPostForm.js # Edit post form displayed in fullscreen dialog
        │   ├── PostComments.js # Displays the comments for a selected post.
        │   ├── PostContent.js # Used in Posts.js - content of post card, body/content of post
        │   ├── PostDetailView.js # View for displaying a specific post
        │   ├── PostDetailViewNavigation.js # Navigation when viewing a selected post
        │   ├── PostFooter.js # Used in Posts.js - footer of post card, holds comment count and edit/delete post
        │   ├── PostHeader.js # Used in Posts.js - header of post card, contains posts title and vote component
        │   ├── Posts.js # Component to create each post item in the posts list
        │   ├── PostsList.js # Component listing all the posts
        │   ├── PostsSort.js # Sort feature when viewing all posts in PostsList
        │   ├── PostsView.js # Component to mount when route is view all posts or view posts for a specific category
        │   ├── PostsViewNavigation.js # Navigation toolbar for when viewing our posts list
        │   └── VoteUpDown.js # The component used for voting up or down on posts and comments
        └── reducers
            ├── categories.js
            ├── comments.js
            ├── index.js
            └── posts.js
```       

## License
This project is licensed under the terms of the MIT license.

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
