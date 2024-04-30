const express = require('express');
const app = express()
const port = process.env.PORT || 3000;

const genres = [
    {id: 1, genre: 'adventure'},
    {id: 2, genre: 'fantasy'},
    {id: 3, genre: 'horro'},
    {id: 4, genre: 'comedy'},
]

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.listen(port, () => console.log(`listening on port ${port}`))
