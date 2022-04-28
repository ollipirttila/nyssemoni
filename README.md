## What is this app and what does it do?

Nyssemoni is a dashboard app (I actually use daily) to view real time data about departing busses from "favourite"
bus stops, e.g. stops I use to and from work and hobbies. It makes it easy to see at a glance, when is my next available bus departing.
The app leverages Tampere City's Public Transport [Journeys API](https://data.tampere.fi/data/en_GB/dataset/journeys-api)
and browser local storage to save user preferences.

This is a learning project I used to learn React with ([Redux Toolkit](https://redux-toolkit.js.org/) template).
Usage of Redux store in such a small app might be a bit overkill, but this app was made in order to learn structures and
practices to build more complex apps.

### Live Demo

[https://nyssemoni.elokuvaaja.fi/](https://nyssemoni.elokuvaaja.fi/)

### In the app you can:

1. Search for a Tampere region bus stop by name or code
2. Save any stop to your favourite stops for quick access
3. Edit and delete your quick access stops.

## Available Scripts

In the project directory, you can run:

### `npm install`

If running for the first time on your machine, run this to install app dependencies.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
