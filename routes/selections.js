const express = require('express');
const router = express.Router();
const config = require('../knexfile.js');
const knex = require('knex')(config);

router
.route('/')
.get((req, res) =>{
    knex
        .select(
            'music_genre_id',
            'music_genre'
        )
        .from('music_genre')
        .then((data) =>{
            res.json(data);
        })
        .catch((err) =>{
            console.log(err);
        })
});

router
.route('/:id')
.get((req, res) =>{
    knex
        .select(
            'shows_id',
            'dj',
            'name',
            'address',
            'city',
            'state',
            'date'
        )
        .from('shows')
        .join('music_genre', 'music_genre.music_genre_id', '=', 'shows.music_genre_id')
        .join('venues', 'venues.venue_id', '=', 'shows.venue_id')
        .where('shows.music_genre_id', req.params.id)
        .then((data) =>{
            res.json(data);
        })
        .catch((err) =>{
            console.log(err);
        })
})


module.exports = router;