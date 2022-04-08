const express = require('express');
const router = express.Router();
require('dotenv').config();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
const client2 = yelp.client(process.env.YELP_KEY_2);
const axios = require('axios');

router.get('/', (req, res) => {
  client.search({
    location: '10151 arrow rte, rancho cucamonga',
    term: 'bakery',
    categories: null,
    radius: 500,
    attributes: null
  })
    .then(data => {
      console.log('data', data.jsonBody.businesses)
      let parsed = JSON.parse(data.body).businesses;
      let busAndCar = [];
      data.jsonBody.businesses.forEach(item => {
        busAndCar.push(item.name, item.categories)
      })
      console.log('busAndCar', busAndCar)
      let allBusDetails = [];
      let allIds = [];
      parsed.forEach(item => {
        let { id, name, categories } = item;
        allIds.push(id);
        let parsedObj = { id, name, categories };
        allBusDetails.push(parsedObj);
      })
      return allIds;
    })
    .then(ids => {
      const moreBusDetails = ids.map(id => {
        return client.business(id);
      });
      // Not all ids got a success 200. many 429 too many requests. Will need to slow down request speeds.
      const completedDetails = Promise.allSettled(moreBusDetails);
      return completedDetails;
    })
    .then(details => {
      let businessDetails = [];
      details.forEach(item => {
        if (item.value) {
          let { name, is_closed, categories, price, hours } = item.value.jsonBody;
          let neededInfo = { name, is_closed, categories, price, hours };
          businessDetails.push(neededInfo);
        }
      })
    })
    .catch(err => {
      console.log('error from yelp api', err);
    })
})



module.exports = router