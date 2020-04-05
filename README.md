This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
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

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### HOLDEM SIMULATOR APP

Calculating Hand Strength

- Any hand that gets to showdown will require calculation of hand strength to determine winner
  To determine this, given what will always be an array of 5 card objects, return the hand strength.
  function determineHandStrength(hand);

1. Sort cards by score
2. Check for flushes and flush type hands: Flush, Straight Flush, Royal Flush
   a. if all five suits have same suit, Flush
   b. if flush and also sequential score, Straight Flush
   c. if flush, sequential score, and highest score is 14 (Ace), then Royal Flush
   d. if not flush but sequential score, then Straight
3. Check for pair type hands: Four of a kind, Full House, Two Pairs, and One Pair
   a. count up the matches and return those numbers.
   b. if [4,1] or [1,4] it will equal Four of a kind
   if [3,2] or [2,3] it will equal Full House
   if [3,1,1], [1,3,1], or [1,1,3] it will equal Three of a Kind
   if [2,2,1], [2,1,2], or [1,2,2] it will equal Two Pairs
   if [2,1,1,1], [1,2,1,1], [1,1,2,1], or [1,1,1,2] it will equal One Pair
   if [1,1,1,1,1] it will equal High Card
