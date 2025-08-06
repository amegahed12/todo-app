# Todo Application

A comprehensive Todo list application built with React, featuring user authentication, task management, and a modern responsive UI.

## Features

### 🔐 User Authentication
- **Login/Register**: Secure user authentication with Formik and Yup validation
- **Session Management**: Persistent login sessions using localStorage
- **Protected Routes**: Authenticated users can access todo management features

### 📝 Task Management
- **Create Tasks**: Add new todos with name, description, priority, due date, and status
- **Edit Tasks**: Modify existing todo items
- **Delete Tasks**: Remove unwanted todos
- **Toggle Status**: Mark tasks as completed or pending with a single click

### 🎯 Advanced Features
- **Priority Levels**: High, Medium, and Low priority options
- **Due Date Tracking**: Set and track due dates for tasks
- **Status Management**: Pending and Completed status options
- **Smart Filtering**: Filter by status and priority
- **Sorting Options**: Sort by due date, priority, name, or creation date
- **Pagination**: Navigate through large lists of todos efficiently

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators for better UX

## Technology Stack

- **Frontend**: React 19
- **Routing**: React Router v7
- **Form Handling**: Formik with Yup validation
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Backend**: JSON Server (simulated REST API)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd base-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON Server (Backend)**
   ```bash
   npm run server
   ```
   This will start the JSON Server on `http://localhost:3000`

4. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start the React application on `http://localhost:5173`

### Default Login Credentials

For testing purposes, you can use these demo credentials:
- **Username**: `demo`
- **Password**: `demo12345`

## Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── TodoForm.jsx    # Form for creating/editing todos
│   ├── TodoList.jsx    # Display list of todos
│   └── TodoFilters.jsx # Filter and sort controls
├── pages/              # Page components
│   ├── Home.jsx        # Landing page for anonymous users
│   ├── Login.jsx       # User login page
│   ├── Register.jsx    # User registration page
│   └── Todos.jsx       # Main todo management page
├── services/           # API services
│   ├── authApi.js      # Authentication API
│   └── todosApi.js     # Todo CRUD operations
├── HOCs/              # Higher-order components
│   └── AuthGuard.jsx   # Route protection component
└── layouts/           # Layout components
    └── RootLayout.jsx  # Main application layout
```

## API Endpoints

### Authentication
- `GET /users?username={username}` - Get user by username
- `POST /users` - Register new user

### Todos
- `GET /todos?userId={userId}` - Get todos for a user
- `GET /todos/{id}` - Get specific todo
- `POST /todos` - Create new todo
- `PATCH /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

## Key Features Explained

### Authentication Flow
1. Users can register with username, email, and password
2. Login validates credentials against the JSON Server
3. Successful login stores user data in localStorage
4. AuthGuard component protects authenticated routes

### Todo Management
1. **Creating Todos**: Users can create todos with all required fields
2. **Editing**: Click the edit icon to modify existing todos
3. **Deleting**: Click the delete icon to remove todos
4. **Status Toggle**: Click the checkbox to mark as complete/pending

### Filtering and Sorting
- **Status Filter**: Show all, pending, or completed todos
- **Priority Filter**: Filter by high, medium, or low priority
- **Sorting**: Sort by due date, priority, name, or creation date
- **Pagination**: Navigate through results with previous/next buttons

## Error Handling

The application includes comprehensive error handling:
- **Network Errors**: Graceful handling of API failures
- **Validation Errors**: Real-time form validation with clear error messages
- **User Feedback**: Toast notifications for all user actions
- **Loading States**: Visual feedback during API calls

## Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured interface with all controls
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified controls

## Future Enhancements

Potential improvements for the application:
- **Real-time Updates**: WebSocket integration for live updates
- **Categories/Tags**: Organize todos with categories
- **File Attachments**: Upload files to todos
- **Collaboration**: Share todos with other users
- **Offline Support**: PWA features for offline usage
- **Dark Mode**: Toggle between light and dark themes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 