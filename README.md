# IntelliChat

IntelliChat is my modern, responsive chat application built with React and TypeScript. It offers seamless real-time communication, user authentication, file uploads, and a clean, intuitive user interface styled with SCSS modules. Whether you're connecting with friends, colleagues, or building a community, IntelliChat provides a robust platform for your conversational needs.

## Features

- **User Authentication**: Secure login and signup functionality with authentication context management.
- **Real-Time Chat**: Engage in real-time conversations with friends or groups.
- **File Uploads**: Easily upload and share files within chats.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Clean UI**: Intuitive and modern user interface designed with SCSS modules for scoped styling.
- **Protected Routes**: Ensure secure access to authenticated areas of the application.
- **Error Handling**: Robust error boundaries to catch and display runtime errors gracefully.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
  - [React Router](https://reactrouter.com/) - Declarative routing for React.
  - [SCSS Modules](https://github.com/css-modules/css-modules) - Scoped and modular CSS with SASS preprocessing.

- **Build Tools:**
  - [Webpack](https://webpack.js.org/) - Module bundler.
  - [Babel](https://babeljs.io/) - JavaScript compiler.

- **State Management:**
  - [React Context API](https://reactjs.org/docs/context.html) - Manage global state.

- **Backend:**
  - *Note: This README focuses on the frontend. Ensure to link or reference the backend repository/documentation if applicable.*

## Getting Started

Follow these instructions to set up and run IntelliChat on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/intellichat.git
   cd intellichat
   ```

   *Alternatively, you can download the repository as a ZIP file and extract it.*

2. **Install Dependencies**

   Navigate to the project directory and install the required packages:

   ```bash
   npm install
   ```

### Running the Application

1. **Start the Development Server**

   ```bash
   npm start
   ```

   This will launch the application in development mode. Open [http://localhost:8081](http://localhost:8081) to view it in your browser. The page will reload if you make edits. You will also see any lint errors in the console.

2. **Build for Production**

   To build the app for production to the `dist` folder, run:

   ```bash
   npm run build
   ```

   It correctly bundles React in production mode and optimizes the build for the best performance.



**Key Directories and Files:**

- **`src/components/`**: Reusable UI components with their respective styles.
- **`src/contexts/`**: React Contexts for state management (e.g., `AuthContext`).
- **`src/pages/`**: Page-level components representing different routes.
- **`src/routes/`**: Custom route components (e.g., `PrivateRoute` for protected routes).
- **`src/services/`**: API service modules for handling HTTP requests.
- **`src/styles/`**: Global styles and SASS variables.
- **`declarations.d.ts`**: TypeScript declarations for SCSS modules.
- **`webpack.config.js`**: Webpack configuration file.
- **`package.json`**: Project metadata and dependencies.

## Contributing

I welcome contributions to IntelliChat! If you'd like to contribute, please follow these steps:

1. **Fork the Repository**

   Click the "Fork" button at the top right corner of the repository page to create your own forked copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/yourusername/intellichat.git
   cd intellichat
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**

   Implement your feature or fix in the new branch.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request**

   Go to the original repository and click "Compare & pull request." Provide a clear description of your changes and submit the pull request.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as per the terms of the license.
