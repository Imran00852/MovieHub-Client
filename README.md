# 🎬 MovieHub – Recommendation Board

A full-stack MERN application where users can:

- Recommend movies 📽️
- Upvote/downvote movies 👍👎
- Comment on movies 💬
- View rankings based on score 🏆
- Admins can moderate movies/comments and view the leaderboard 🔐

---

## 🚀 Tech Stack

- **Frontend**: React, Redux Toolkit Query, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + Cookies

---

## 🛠️ Features

- **Authentication**: Signup/Login with JWT
- **Movies**: Add, view, delete (admin only)
- **Voting**: Upvote/downvote one movie per user (update allowed)
- **Ranking**: Movies sorted by score (upvotes − downvotes)
- **Comments**: Add, edit, delete your own comments
- **Admin**: Delete movies/comments, view leaderboard

---

## 🖥️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/moviehub.git
cd moviehub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviehub
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs on **http://localhost:8080**  
Backend runs on **http://localhost:5173**

---

## 🗄️ Database Schema (ERD)

```mermaid
erDiagram
    USERS {
        string _id
        string name
        string email
        string passwordHash
        string role
        date createdAt
    }

    MOVIES {
        string _id
        string title
        string description
        string added_by (FK -> USERS)
        date createdAt
    }

    VOTES {
        string _id
        string user_id (FK -> USERS)
        string movie_id (FK -> MOVIES)
        int vote_type (+1 / -1)
        date createdAt
    }

    COMMENTS {
        string _id
        string user_id (FK -> USERS)
        string movie_id (FK -> MOVIES)
        string body
        date createdAt
    }

    USERS ||--o{ MOVIES : "adds"
    USERS ||--o{ VOTES : "casts"
    USERS ||--o{ COMMENTS : "writes"
    MOVIES ||--o{ VOTES : "receives"
    MOVIES ||--o{ COMMENTS : "has"
```

---

## 📌 API Documentation

### 🔑 Auth

| Method | Endpoint                 | Description                   |
| ------ | ------------------------ | ----------------------------- |
| POST   | `/api/v1/users/register` | Register new user             |
| POST   | `/api/v1/users/login`    | Login user, returns JWT token |
| GET    | `/api/v1/users/logout`   | Logout user (clear cookie)    |
| GET    | `/api/v1/users/me`       | Get your profile              |

---

### 🎬 Movies

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| POST   | `/api/movies`     | Add a new movie (auth required)         |
| GET    | `/api/movies`     | Get all movies (sorted by score)        |
| GET    | `/api/movies/:id` | Get single movie (with comments, votes) |
| DELETE | `/api/movies/:id` | Delete movie (admin only)               |

---

### 👍 Votes

| Method | Endpoint              | Description                                                              |
| ------ | --------------------- | ------------------------------------------------------------------------ |
| POST   | `/api/votes/:movieId` | Upvote or downvote a movie (1 = up, -1 = down). Updates if already voted |

---

### 💬 Comments

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| POST   | `/api/comments/:movieId`   | Add a comment to a movie |
| PUT    | `/api/comments/:commentId` | Edit your own comment    |
| DELETE | `/api/comments/:commentId` | Delete your own comment  |

---

### 🔐 Admin

| Method | Endpoint                         | Description                              |
| ------ | -------------------------------- | ---------------------------------------- |
| GET    | `/api/admin/movies/top`          | Get leaderboard of top movies (by score) |
| DELETE | `/api/admin/movies/:movieId`     | Delete a movie + related votes/comments  |
| DELETE | `/api/admin/comments/:commentId` | Delete any comment                       |

---

## 🌍 Deployment

- **Backend**: [Render]
- **Frontend**: [Vercel]
- **Live App**: [https://your-deployed-app.com](https://your-deployed-app.com)

---

## 🤖 AI Usage

AI was **only used for frontend**:

- Getting example React component structures
- Suggesting Material-UI patterns for UI styling

**What I learned:**

- How to adapt AI-generated snippets to fit real data
- How to structure reusable components with MUI
- That using AI speeds up the development process significantly 🚀
