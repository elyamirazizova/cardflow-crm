# CardFlow Backend API

Backend API for CardFlow project management system.

## Installation

```bash
npm install
```

## Initialize Database

```bash
npm run init-db
```

This will create the SQLite database with tables and insert demo data.

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Projects
- `GET /api/projects` - Get all projects (requires auth)
- `GET /api/projects/:id` - Get single project (requires auth)
- `POST /api/projects` - Create new project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Users
- `GET /api/users` - Get all users (requires auth, admin only)
- `GET /api/users/:id` - Get single user (requires auth)
- `GET /api/users/me/profile` - Get current user profile (requires auth)

### Analytics
- `GET /api/analytics` - Get analytics data (requires auth)

### Health Check
- `GET /api/health` - Check API status

## Default Users

- **Admin**: admin@cardflow.ru / admin123
- **Analyst**: analyst@cardflow.ru / admin123
- **User**: user@cardflow.ru / admin123

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

