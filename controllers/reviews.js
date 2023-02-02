const Movie = require('../models/movie')

module.exports = {
    create,
    delete: deleteReview,
    update: editReview,
    edit

}

function create(req, res) {
    Movie.findById(req.params.id, function(err, movie) {

        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar

        movie.reviews.push(req.body)
        movie.save(function(err) {
            res.redirect(`/movies/${movie._id}`)
        })
    })
}


async function deleteReview(req, res, next) {
    try {
        const movie = await Movie.findOne({'reviews._id': req.params.id})
        if (!movie) return res.redirect('/movies')
        movie.reviews.remove(req.params.id)
        await movie.save()
        res.redirect(`/movies/${movie._id}`)
    } catch(err) {
        return next(err)
    }
}

async function editReview(req, res, next) {
    console.log("edit")
    try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.redirect('/movies');
    const review = movie.reviews.id(req.params.reviewId);
    if (!review) return res.redirect(`/movies/${movie._id}`);
    review.content = req.body.content;
    await movie.save();
    res.redirect(`/movies/${movie._id}`);
    } catch (err) {
    return next(err);
    }
    }

async function edit(req, res, next) {
 const movie = await Movie.findOne({'reviews._id':req.params.id})
 const review = movie.reviews.id(req.params.id);
 console.log("review", review)
 res.render('movies/edit', {movie, review})
}
    




