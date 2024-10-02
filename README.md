# Blog App (MERN Stack)

## Description
Live Demo: <a href='https://blog-app-z42m.onrender.com/'> Check out the Blog App here!<a/>

This is a MERN Stack project that allows users to create and manage blog posts. The application includes user authentication, post filtering, sorting, and pagination. It integrates Google OAuth for login and employs cookie-based authentication using JWT tokens.

<br>

## Features

* **User Authentication**: Login with Google (OAuth 2.0), JWT-based authentication, cookie-based session management.
* **Blog Management**: Users can create, edit, and delete blog posts with a rich-text editor using ReactQuill. Author profiles with a profile picture and name are also displayed.
*  **State Management:** The application uses Redux Toolkit for efficient and scalable state management.
* **Post Filtering & Sorting**: The app provides pagination for easy navigation between posts and allows sorting based on creation date or title. Posts can also be filtered by categories or tags.
* **Responsive Design**: The UI is fully responsive and designed with Flexbox and custom CSS styles for both light and dark modes.
* **Data Fetching**: Posts are dynamically fetched from MongoDB, with real-time updates handled through Axios.



<br>

## Tech Stack
### Frontend
* **React:** For building the user interface.
* **Redux Toolkit:** For managing application state.
* **ReactQuill:** Rich-text editor for blog posts.
* **Flowbite-React:** For UI components and styling.
* **Axios:** For handling API requests.
* CSS/Flexbox:** For responsive layouts and custom button styles.
* **CSS/Flexbox:** For responsive layouts and custom styles.
* **JWT:** For secure authentication.
* **Google OAuth 2.0:** For user authentication with Google.

### Backend
* **Node.js:** Backend runtime environment.
* **Express.js:** Web framework to manage routes and API requests.
* **MongoDB:** NoSQL database to store blog posts and user data.
* **Mongoose:** ODM library to manage MongoDB interactions.
* **JWT:** For token-based authentication.
* **Google OAuth:** For handling Google login.

### Other Libraries & Tools
* **Moment.js:** To handle and format dates.
* **Bcrypt.js:** For hashing passwords securely.
* **Cookie-Parser:** For managing cookies in Express.
* **Dotenv:** For environment variable management.
* **Cors:** For enabling cross-origin requests in API. 


<br>

<br>


## Installation & Setup
```bash
git clone https://github.com/MehmetPektas/Blog-App-MERN-Stack.git
cd Blog-App-MERN-Stack
```
```
npm install

```
```
MONGO_URI=<your-mongodb-uri>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
JWT_SECRET=<your-jwt-secret>

```
```
npm start

```

<br>


## Contributing 🚀
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.




