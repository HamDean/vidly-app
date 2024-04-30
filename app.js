const express = require('express');
const app = express()
const port = process.env.PORT || 3000;

const genres = [
    {id: 1, genre: 'adventure'},
    {id: 2, genre: 'fantasy'},
    {id: 3, genre: 'horro'},
    {id: 4, genre: 'comedy'},
]

const lookUpGenre = (id) => {
    return genres.find(genre => genre.id === parseInt(id))
}

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = lookUpGenre(req.params.id)

    if(!genre) return res.status(404).send('No genre found :(')

    res.send(genre)
})

app.listen(port, () => console.log(`listening on port ${port}`))
