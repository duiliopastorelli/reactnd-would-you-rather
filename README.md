# Would you rather project

This project is part of the Udacity's React nanodegree course.

## Run the App
Install the needed dependencies
```
yarn install
```

Run the App in Development mode
```
yarn start
```

Build the Application
```
yarn run build
serve -s build
```

Note: alternatively to yarn it is possible to use npm.

## Login note:
When the user performs a login, the userId is saved in both the Store and the
 localStorage.
 
This means that if the user already logged in, but didn't log out, typing any
 valid url in the address bar will route the user to the specific resource 
 without asking for further login.
 
To test the application from a "not logged in" user prospective please use 
the "logout" button in the top bar, as this clear both the Store and the 
localStorage. Alternatively please clear the localStorage manually.
  
This functionality has been added to simulate a login token persisted in the 
user device.