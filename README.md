# Hiring System Frontend

A modern web application built with Next.js for managing user registrations. This application provides a clean and intuitive interface for creating and managing user profiles with various features and validations.

## Features

### User Registration
- Full name validation with character limit
- Date of birth picker
- Location selection from predefined options
- Multiple programming skills selection
- Resume summary with character counter
- Real-time form validation
- Comprehensive error handling

### User Management
- View all registered users in a tabulated format
- Search functionality across multiple fields
- Detailed user view in modal
- Skills displayed as tags
- Responsive design for all screen sizes

### UI/UX Features
- Modern, clean interface
- Form validation feedback
- Loading states
- Toast notifications
- Responsive layout
- Dark/Light mode support

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **HTTP Client:** Axios
- **State Management:** React Hooks
- **Icons:** Lucide React
- **Notifications:** Sonner

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (version 18 or later)
- npm (version 8 or later)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Al0olo/hiring-platform-frontend
cd hiring-platform-frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── new-user/
│   │   └── page.tsx            # User registration form
│   └── view-users/
│       └── page.tsx            # Users list view
├── components/
│   ├── ui/                     # Reusable UI components
│   └── shared/                 # Shared components
├── services/
│   └── api.ts                  # API service layer
├── styles/
│   └── globals.css             # Global styles
└── types/
    └── index.ts                # TypeScript definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3001 |

## API Integration

The frontend communicates with a NestJS backend API. Ensure the backend server is running and accessible at the URL specified in your environment variables.

### Available Endpoints:

- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user details

## Form Validation Rules

### Full Name
- Required
- Maximum 50 characters

### Date of Birth
- Required
- Must be a valid date

### Preferred Location
- Required
- Must be one of: Sydney, Melbourne, Brisbane, Adelaide, Perth

### Programming Skills
- At least one skill must be selected
- Available options: React, Angular, C#, Java, Ruby, Python

### Resume Summary
- Required


## Error Handling

The application includes comprehensive error handling:
- Form validation errors
- API request errors
- Network errors
- Loading states
- User feedback via toast notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)