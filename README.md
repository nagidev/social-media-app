# social-media-app
Social media clone powered by ReactJS, ExpressJS and NodeJS

## **Initial Setup**
Make sure to include a `.env` file in the project's root folder with the following content:
```
PORT = <port number to run the webpage on>
DB_URI = <link to your mondodb server>
JWT_KEY = <a key to generate auth tokens>
```

From the project's root directory run
```
npm install
cd client
npm install
```
This will install the dependencies for the project.
## **Run ( Development )**
### **Development server**

From the project's root directory to start the development server run
```
npm run dev
```
### **React Client**
From a separate terminal window
start the ReactJS client
```
cd client
npm start
```