const express = require('express');
const router = express.Router();



/* GET tournaments index. */
router.get('/', function (req, res, next) {
    const tournamentsTable = Tournament.list();
    res.render('exoplanets/index.hbs', { tournamentsTable });
});


/* GET details exoplanet. */
router.get('/details', function (req, res, next) {
    console.log("GET DETAILS TOURNAMENTS");
    // convert string req.query.id to int
    // another solution is to use == instead of === in if instruction
    const tournamentsIdParam = parseInt(req.query.id);
    const tournamentsFound = Tournament.findById(tournamentsIdParam);
    res.render('exoplanets/details.hbs', { tournament: tournamentsFound  });

});




/* POST add exoplanet. */
router.post('/create', upload.single('imageTournament'), function (req, res, next) {
    console.log("POST ADD TOURNAMENT");
    // validate name of explanet -> betweeen 3 and 100 character
    if (validator.isLength(req.body.uniqueNameTournament, { min: 3, max: 100 })) {
        console.log("req.file : " + JSON.stringify(req.file));
        let filename = null;
        // req.file must be undefined if no file given
        if (req.file === undefined) filename = null;
        else filename = 'images/' + req.file.filename;
        Tournament.save({
            uniqueName: req.body.uniqueNameExoplanet,
            hClass: req.body.hClassExoplanet,
            discoveryYear: req.body.discoveryYearExoplanet,
            image: filename
        });
        res.redirect('/exoplanets');
    }
    else {
        res.redirect('/exoplanets?errors= Le nom d\'une exoplanète doit faire entre 3 et 100 caractères');
    }
});




module.exports = router;