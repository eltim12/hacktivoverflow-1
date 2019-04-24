const Tag = require('../models/tag');

module.exports = (tags) => {
  let uniqueObjectTags = {};
  tags.map(tag => {
    uniqueObjectTags[tag] = 0;
  });
  let uniqueArrayTags = Object.keys(uniqueObjectTags);
  let promiseTags = []
  uniqueArrayTags.forEach(tag => {
    promiseTags.push(new Promise((resolve, reject) => {
      Tag
        .findOne({
          name: tag
        })
        .then((foundTag) => {
          if (!foundTag) {
            Tag
              .create({
                name: tag
              })
              .then(created => {
                resolve(created)
              })
              .catch(error => {
                reject(error)
              })
          }
        })
        .catch(err => {
          reject(err)
        })
    }))
  })
  Promise.all(promiseTags)
}