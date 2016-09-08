'use strict';

let places = require('./placesApi.js');
let Promise = require('bluebird');
let rp = require('request-promise');


module.exports = {
  indeedApiCall: function(query, cb) {
    return rp.get(query).then((item) => {
      item = JSON.parse(item);
      let results = item.results.map(function(item) {
        let obj = {
          jobtitle: item.jobtitle,
          company: item.company,
          city: item.city,
          state: item.state,
          date: item.date,
          snippet: item.snippet,
          url: item.url,
          jobkey: item.jobkey,
          latitude: item.latitude,
          longitude: item.longitude,
        };
        return obj;
      });

      return Promise.map(results, function(item) {
        return places.googlePlacesApiCall(item);
      }).then(function(result) {
        return result;
      });
    }).
    catch(function (err) {
      console.log(err);
    });
  }
};
