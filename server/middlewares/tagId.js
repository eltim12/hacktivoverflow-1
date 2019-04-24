const Tag = require('../models/tag');

module.exports = (req, res, next) => {
    if (req.body.action === 'add') {
        Tag
            .findOne({
                name: req.body.tagname
            })
            .then((foundTag) => {
                if (foundTag) {
                    req.body.tagId = foundTag._id
                    next()
                } else {
                    res.status(404).json({
                        msg: `${req.body.tagname} does not exist on this site`
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
    } else {
        next()
    }
}