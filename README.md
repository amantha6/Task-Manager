# Task Management Application

A modern, responsive task management application built with Next.js, React 19, TypeScript, and Tailwind CSS. This project uses the Shadcn UI component library for a clean, accessible interface.

## Features

- Task creation, editing, and management
- Modern, responsive UI with dark mode support
- Built with accessibility in mind
- Type-safe with TypeScript
- Styled with Tailwind CSS and customizable theming

## Tech Stack

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS with CSS variables for theming
- **Components**: Shadcn UI with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **Charting**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app                 # Next.js app directory
│   ├── globals.css     # Global CSS and theming
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page component
├── components          # UI components
│   ├── ui              # Shadcn UI components
│   └── task-manager.tsx  # Main task manager component
├── hooks               # Custom React hooks
├── lib                 # Utility functions
├── public              # Static assets
├── styles              # Additional styles
├── types               # TypeScript type definitions
├── components.json     # Shadcn UI configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies
├── pnpm-lock.yaml      # pnpm lock file
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Customization

### Theme

The application uses CSS variables for theming. You can customize colors and other design tokens in the `globals.css` file. The project supports both light and dark modes.

### Components

UI components are built with Shadcn UI, which provides a collection of accessible, reusable components. You can customize these components to match your design requirements.

## Development

### Adding New Features

1. Create new components in the `components` directory
2. Add new pages in the `app` directory
3. Update types as needed in the `types` directory

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.ts` and add utility classes in `globals.css`.

## Building for Production

```bash
pnpm build
```

This will create an optimized production build of your application in the `.next` folder.

## Running in Production

```bash
pnpm start
```

This will start the application in production mode.

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
