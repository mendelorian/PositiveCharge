const express = require('express');
const router = express.Router();

const {verifyToken} = require('./authRoutes.js')

router.route('/view')
  .get(async (req, res, next) => {
    try {
      const result = await router.grabview([req.query.id]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });
// put verify token back in for production
router.post('/poi/love', async (req, res, next) => {
  let id = req.body.name
    try {
      const result = await router.lovePoi([id])
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });
// put verify token back in for production
router.post('/poi/flag', async (req, res, next) => {
  let id = req.body.name
    try {
      const result = await router.flagPoi([id]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });
// put verify token back in for production
router.put('/experience/love', async (req, res, next) => {
  let id = req.body.name
  let exp = req.body.experience;
    try {
      const result = await router.loveExp([id, exp]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });
// put verify token back in for production
router.put('/experience/flag', async (req, res, next) => {
  let id = req.body.name
  let exp = req.body.experience;
    try {
      const result = await router.flagExp([id, exp]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
// put verify token back in for production
router.post('/experiences', async (req, res, next) => {
    let { id, experience } = req.body;
    try {
      const result = await router.addExperience([id, experience]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .delete(async (req, res, next) => {
    const [poi_id, primary_id] = [req.body.id, req.body.primary_id];
    try {
      const result = await router.deleteExperience([poi_id, primary_id]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

module.exports = router;
