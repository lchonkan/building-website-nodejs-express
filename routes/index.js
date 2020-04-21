const express = require('express');

const speakersRoute = require('./speakers');

const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  // Route definition for home directory

  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const topSpeakers = await speakerService.getList();
    const artwork = await speakerService.getAllArtwork();
    response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, artwork });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
