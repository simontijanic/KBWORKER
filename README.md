# KBWorker - Kickboxing Workout Platform

A web application for managing and accessing kickboxing workouts, training programs, guides, and collections.

## Features

- User authentication (register/login)
- Personalized workout bookmarks
- Training program management
- Technical guides and tutorials
- Curated collections
- Mobile responsive design
- Save/unsave functionality for all content types

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: EJS templates
- **Database**: MongoDB
- **Authentication**: Session-based with bcrypt
- **Styling**: Custom CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd VS-Code-Kickboxing
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with these variables:
```env
MONGO_URI="mongodb://127.0.0.1:27017/kickboxing"
SESSION_SECRET="your-secret-key"
```

4. Start MongoDB service (if using local installation):
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo service mongod start
```

5. Run the application:
```bash
node index.js
```

The application will be available at `http://localhost:3000`

## Project Structure

```
VS-Code-Kickboxing/
├── controllers/
│   ├── databaseController.js    # Database connection and seeding
│   ├── registrationController.js # Auth controller
│   └── userController.js        # Main app controller
├── middleware/
│   └── auth.js                  # Authentication middleware
├── models/
│   ├── collectionModel.js       # Collection schema
│   ├── guideModel.js           # Guide schema
│   ├── programModel.js         # Program schema
│   ├── userModel.js           # User schema
│   └── workoutModel.js        # Workout schema
├── public/
│   └── styles/
│       ├── header.css         # Navigation styles
│       └── main.css          # Main application styles
├── routes/
│   └── userRoute.js         # Route definitions
├── views/
│   ├── components/
│   │   ├── foot.ejs        # Footer partial
│   │   ├── head.ejs        # Header partial
│   │   └── navbar.ejs      # Navigation partial
│   ├── collections.ejs     # Collections page
│   ├── guides.ejs         # Guides page
│   ├── index.ejs         # Home page
│   ├── login.ejs        # Login page
│   ├── profile.ejs      # User profile
│   ├── programs.ejs     # Programs page
│   ├── registration.ejs # Registration page
│   └── workouts.ejs    # Workouts page
├── .env                # Environment variables
├── .gitignore         # Git ignore rules
├── index.js           # Application entry point
└── package.json       # Project dependencies
```

## Database Models

### User
- Username (unique)
- Password (hashed)
- Saved workouts, programs, guides, and collections

### Workout
- Title
- Description
- Difficulty level
- Duration
- Equipment needed
- Categories
- Content

### Program
- Title
- Description
- Duration (days)
- Difficulty level
- Schedule with workouts
- Equipment needed
- Categories

### Guide
- Title
- Sections with content
- Sources
- Categories
- Tags

### Collection
- Name
- Description
- Image
- Associated workouts and programs
- Featured status

## API Routes

### Authentication
- `GET /login` - Login page
- `POST /login` - Process login
- `GET /register` - Registration page
- `POST /register` - Process registration
- `POST /logout` - Logout user

### Content
- `GET /` - Home page
- `GET /workouts` - All workouts
- `GET /workouts/:workoutId` - Single workout
- `GET /programs` - All programs
- `GET /programs/:programId` - Single program
- `GET /guides` - All guides
- `GET /guides/:guideId` - Single guide
- `GET /collections` - All collections
- `GET /collections/:collectionId` - Single collection

### User Profile
- `GET /profile` - User profile
- `POST /workouts/:workoutId/toggle-save` - Toggle workout save
- `POST /programs/:programId/toggle-save` - Toggle program save
- `POST /guides/:guideId/toggle-save` - Toggle guide save
- `POST /collections/:collectionId/toggle-save` - Toggle collection save

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.