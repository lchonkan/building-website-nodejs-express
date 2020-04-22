const express = require('express');

const { check, validationResult } = require('express-validator');
// $ Check is a routing middleware. it accepts the same request, response and next signature
// $ like any other handler funciton. we are goint to CHAIN it in the POST route.

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();

      // $ here we evaluate if the there are any feedback ERRORS coming from calling
      // $ the GET method from the error function in the POST method.
      const errors = request.session.feedback ? request.session.feedback.errors : false;
      request.session.feedback = {};

      const successMessage = request.session.feedback ? request.session.feedback.message : false;

      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  // $ The router on the feedbackjs file now contains an express-validator to check the inputs
  router.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('Email address is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 3 }).escape().withMessage('A message is required'),
    ],

    async (request, response) => {
      // Here we add the errors var with the validationResult method from the express-validator
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        // we store the eror data in an object on the the current SESSION OBJECT, accesible via request.session
        request.session.feedback = {
          errors: errors.array(), // an array of errors from express validator
        };

        return response.redirect('/feedback');
        // Redirect to the GET ROUTE
        // this redirect response is because everytime you send a form you need to avoid that
        // the user can hit the reload button to send it again.
      }
      // console.log(request.body); // we are getting this body from the body-parser middleware in the server.js file

      // $ Here we fetch the arguments of the add entry function from the request.body object that is send by the POST method.
      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: 'Thank you for your feedback!',
      };
      // $ Redirect to the
      return response.redirect(`/Feedback`);
      // Redirect to the GET ROUTE
    }
  );

  return router;
};
