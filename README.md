# Blockchain Explorer

This is a full-stack blockchain explorer application built with Next.js, NestJS, MongoDB, TypeScript, and various other technologies. It allows users to explore and view transaction data for Starknet blockchain network.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- pnpm
- MongoDB

## Getting Started

Follow these steps to set up and run the application locally:

1. Clone the repository:
   ```
       git clone https://github.com/kushagrasarathe/blockchain-explorer.git
   ```
2. Set up the backend:
   - Navigate to the backend directory:
     ```
        cd backend
     ```
   - Install the backend dependencies:
     ```
        pnpm install
     ```
   - Set up the environment variables:
     - Create a `.env` file in the backend directory.
     - Add the following variables to the .env file:
       ```
        MONGO_URI=""
        BLAST_API=""
       ```
   - Start development server:
     ```
        pnpm start:dev
     ```
3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
        cd ../frontend
     ```
   - Install the frontend dependencies:
     ```
        pnpm install
     ```
   - Set up the environment variables:
     - Create a `.env` file in the backend directory.
     - Add the following variables to the .env file:
       ```
        NEXT_PUBLIC_API_URL="http://localhost:8080"
        SERVER_URL="http://localhost:8080"
       ```
   - Start development server:
     ```
        pnpm dev
     ```
4. Access the application:
   - Open your web browser and visit `http://localhost:3000` (or the port you specified for the frontend).
   - You should see the blockchain explorer application running.
