
# Full stack Website with google and JWT auth
 
 This website have google authentication along with JWT authentication, it fetches images from S3 bucket as well as Google drive public folder.
 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET`

`MONGODB_URL`

`PORT`

--------------------------------------

in `server\router` put the **credetials.json** file which we get from google cloud.

in `src\auth` put make the **config.js** file and put your credentials from firebase their. 
Also do the below changes to the config.js file:

*remove all the import and put this ------------------------------>*
> import { initializeApp } from "firebase/app";
> import { getAuth, GoogleAuthProvider } from "firebase/auth";

*remove all the export and put this ------------------------------>*

> const app = initializeApp(firebaseConfig);
> const auth = getAuth(app);
> const provider = new GoogleAuthProvider();
> export { auth, provider };

### Run Locally

Clone the project

```bash
  https://github.com/NigamDevansh/Website
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies and running the frontend:

```bash
  npm install
```

```bash
  npm run dev
```
Install dependencies and running the backend:
```bash
  cd server
```
```bash
  npm install
```

```bash
  npm run dev
```


