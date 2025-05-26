# Getting Started with Create React App

Tech Stack
Frontend: React (TypeScript)
Backend/API: Vercel Serverless Functions (Node.js, CommonJS)
Database: MongoDB Atlas (Cloud)
Deployment: Vercel

Development Workflow
Local Development:
Use vercel dev (not npm start) to run both the React frontend and API endpoints locally, mirroring the production environment.
MongoDB Integration:
All concepts (nodes) and categories are stored in a MongoDB Atlas database.
Environment variables (MONGODB_URI, MONGODB_DB) must be set both locally (.env.local) and in Vercel’s dashboard for production.
Master List Logic:
The skillsMasterList.js file is used only for initial seeding or as a fallback if the database is empty.
All live data (nodes and categories) is read from and written to MongoDB.
Adding, editing, or deleting nodes/categories in the app updates MongoDB directly.
The master list file is not automatically updated when you make changes in the app.
To back up or version your data, use the app’s export feature and commit the exported file to GitHub manually.
Production Deployment
The app is deployed on Vercel and uses the same MongoDB database as local development (if environment variables are set correctly).
All changes made in the app are immediately reflected in MongoDB and visible to all users.
Tip:
If you update your environment variables in Vercel, always trigger a redeploy for changes to take effect.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
