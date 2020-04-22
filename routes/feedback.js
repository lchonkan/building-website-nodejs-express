const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();
      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
      });
    } catch (err) {
      return next(err);
    }
  });

  //TODO import body-parse to parse the feedback responses within the router post method
  router.post('/', (request, response) => {
    console.log(request.body); // we are getting this body from the body-parser middleware in the server.js file
    return response.send(`Feedback from posted`);
  });

  return router;
};
