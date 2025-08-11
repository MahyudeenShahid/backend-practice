# Node.js Express CRUD App

## Overview
This is a beginner-friendly backend application built with Node.js and Express. It demonstrates CRUD operations for user posts, dynamic rendering with EJS, and basic web server features.

## Features
- CRUD Operations: Create, Read, Update, Delete posts
- Dynamic Views: Uses EJS templates for rendering pages
- Static Assets: Serves CSS and other files from the `public` directory
- Routing: RESTful routes for posts, search, contact, and services
- Error Handling: Custom error page for invalid post IDs
- Request Logging: Console logs for debugging and learning
- Method Override: Supports PATCH and DELETE via forms

## File Structure
```
index.js                # Main server file
package.json            # Project metadata and dependencies
public/style.css        # Stylesheet for views
views/                  # EJS templates
  edit.ejs
  index.ejs
  new.ejs
  post.ejs
  posterror.ejs
```

## Installation
1. Clone the repository or copy the files to your project directory.
2. Run `npm install` to install dependencies.

## Usage
1. Start the server:
   ```
   node index.js
   ```
2. Open your browser and go to `http://localhost:3000/posts` to view all posts.

## API Endpoints
### Posts
- `GET /posts` — List all posts
- `GET /posts/new` — Form to create a new post
- `POST /posts` — Create a new post
- `GET /posts/:id` — View a single post
- `GET /posts/:id/edit` — Form to edit a post
- `PATCH /posts/:id` — Update a post
- `DELETE /posts/:id` — Delete a post

### Other Routes
- `GET /contact` — Contact page
- `GET /services` — Services page
- `GET /search` — Search page (query params)
- `GET /search/:term` — Search by term

## Data Structure
Posts are stored in-memory as an array of objects:
```js
{
  id: String,        // Unique UUID
  username: String,  // Author name
  content: String    // Post content
}
```

## Templates
- `index.ejs` — Displays all posts
- `new.ejs` — Form for creating a post
- `edit.ejs` — Form for editing a post
- `post.ejs` — Displays a single post
- `posterror.ejs` — Error page for invalid post IDs

## Customization
- Add more fields to posts as needed
- Connect to a database for persistent storage
- Enhance error handling and validation

## License
This project is for learning and personal use.
