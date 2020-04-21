// TODO MAKE THE ARTWORK SECTION A PARTIAL AND THEN MAKE IT DYNAMIC
// ! Steps
// TODO 1. Make sure to use the GetAllArtwork() method in the Speaker Services (takes in a shortname)
// TODO 2. also uset the getArtworkForSpeaker() method
//* 3.
// ? Change the routes to fetch the right array of atwork
// TODO provide the rights arrays of atwork to the templates
// TODO First Create the templates
// ! and then provide those arrays to the templates
// ! Once inside the template =>
// *Factor out the artwork on the sidebar
// * Iterate through the array of artwork items to create a list that we see on the page

const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1); // so that it works on production.

app.use(
  cookieSession({
    name: 'session',
    keys: ['dushf1882rsahf2131sdkjf', 'fasfasfasfasfa'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'San José de Noche';

app.use(express.static(path.join(__dirname, './static')));
// we need a route that we can open i thebrowser

// Setting up global variables
app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames = names;
    // console.log(response.locals.speakerNames);
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => {
  console.log(`Express server is listening on port: ${port}`);
});
