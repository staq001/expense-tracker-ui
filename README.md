# Expense Tracker Frontend

A modern React/Next.js frontend for managing your expenses, built to connect with an Express.js backend API.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

## Setup Instructions

### 1. Clone or Download the Project

If you have the project as a ZIP file, extract it to your desired location. If using Git:

\`\`\`bash
git clone github.com/staq001/expense-tracker-ui
cd expense-tracker
\`\`\`

### 2. Install Dependencies

Navigate to the project directory and install all required packages:

\`\`\`bash
npm install
\`\`\`

This will install all dependencies listed in `package.json`, including Next.js, React, Tailwind CSS, Recharts, and Axios.

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of the project:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit the `.env.local` file and update the API URL to match your Express.js backend:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

**Important:** Make sure your Express.js backend is running on `localhost:3000` before starting the frontend.

### 4. Start the Development Server

Run the development server:

\`\`\`bash
npm run dev -- -p 3001
\`\`\`

The application will be available at `http://localhost:3001` in your browser.

## Features

- **Authentication**: Sign up and log in with your credentials
- **Dashboard**: View financial overview with stats and spending charts
- **Expense Management**: Create, read, update, and delete expenses
- **Categories**: Organize expenses by category (income, housing, groceries, shopping, entertainment, others)
- **Filtering**: Filter expenses by category
- **Pagination**: Browse through expenses with pagination
- **User Settings**: Update profile information and manage account

## API Endpoints Used

The frontend connects to the following Express.js API endpoints:

### User Routes

- `POST /api/v1/user/signup` - Create a new account
- `POST /api/v1/user/login` - Log in to your account
- `GET /api/v1/user/me` - Get current user info
- `PATCH /api/v1/user/me/update` - Update user profile
- `DELETE /api/v1/user/me/delete` - Delete user account

### Expense Routes

- `POST /api/v1/expense/create` - Create a new expense
- `GET /api/v1/expenses/all` - Get all expenses (with pagination)
- `GET /api/v1/expenses` - Get expenses by category
- `GET /api/v1/expense/:id` - Get a specific expense
- `PATCH /api/v1/expense/:id` - Update an expense
- `DELETE /api/v1/expense/:id` - Delete an expense

## Troubleshooting

### Cannot Connect to Backend

- Ensure your Express.js backend is running on `localhost:3000`
- Check that the `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
- Check browser console for CORS errors

### Build Errors

If you encounter build errors, try:
\`\`\`bash
rm -rf .next node_modules
npm install
npm run dev
\`\`\`

### Authentication Issues

- Clear browser cookies and localStorage
- Check that your backend is returning valid JWT tokens
- Verify the token is being stored in localStorage

## Building for Production

To create a production build:

\`\`\`bash
npm run build
npm start
\`\`\`

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
