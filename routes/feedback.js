const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Feedback');
  });

  router.post('/', (request, response) => {
    return response.send(`Feedback from posted`);
  });

  return router;
};
