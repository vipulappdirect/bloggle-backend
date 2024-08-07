
# Express.js | Bloggle Backend | Setup and Execution

## BackEnd Deployed at: [Bloggle Express JS Backend Service](https://bloggle-kljc.vercel.app/api/home)
## GIT Repository: [Bloggle Express JS Backend Service GIT Repository](https://github.com/vipulappdirect/bloggle-backend)

## Ui Deployed at: [Bloggle Next JS Frontend Service](https://bloggle-puce.vercel.app/)
## GIT Repository: [Bloggle Next JS Frontend Service GIT Repository](https://github.com/vipulappdirect/bloggle-ui)

This README provides instructions on how to set up and run the Next.js project in various environments.

## Development Environment

To start the development server and work on the project:

1. Open a terminal and navigate to the project's root directory.
2. Run the command `npm run dev`.
    - This command uses nodemon to monitor changes in the `src` directory.
    - Whenever a file is modified, nodemon automatically restarts the server.
    - The development server allows for quick iteration and testing of changes.

## Production Environment

To run the project in a production environment:

1. Open a terminal and navigate to the project's root directory.
2. Run the command `npm start`.
    - This command starts the production server using ts-node.
    - The server will be optimized for performance and stability.

## Building the Project

To build the project and generate necessary files:

1. Open a terminal and navigate to the project's root directory.
2. Run the command `npm run build`.
    - This command executes the following steps:
        - Navigates to the `src/repository` directory.
        - Generates the Prisma client.
        - Returns to the project's root directory.
        - Installs project dependencies using `npm install`.
        - Compiles the TypeScript code using `tsc`.

## Deploying to Vercel

The project is configured for seamless deployment to Vercel:

- The `vercel-build` script is set up to run `npm run build` during the deployment process.
- Vercel will automatically execute this script to build the project before deploying it.

By following these instructions, you should be able to set up, run, and deploy the Next.js project successfully. If you encounter any issues or have further questions, please don't hesitate to reach out for assistance.