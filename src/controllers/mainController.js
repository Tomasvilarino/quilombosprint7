const path = require ('path')

let mainController = {
home: (req, res) => res.render ('home.ejs'),
}

module.exports = mainController
