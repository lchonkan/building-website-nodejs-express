const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  // router.get('/', async (request, response) => {
  //   const speakers = await speakerService.getList();
  //   return response.json(speakers);
  // });

  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    const allArtwork = await speakerService.getAllArtwork();
    response.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
      allArtwork,
    });
  });

  router.get('/:shortname', async (request, response) => {
    const speaker = await speakerService.getSpeaker(request.params.shortname);
    const speakerArtwork = await speakerService.getArtworkForSpeaker();
    console.log(speaker);
    response.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers-detail',
      speaker,
      speakerArtwork,
    });
  });

  return router;
};
