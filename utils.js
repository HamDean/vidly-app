
const lookUpGenre = (id) => {
    return genres.find((genre) => genre.id === parseInt(id));
  };
  
  const notFound = (res) => {
      return res.status(400).send("genre not found :(");
  }
  
  const badRequest = (res, error) => {
      return res.status(400).send(error.details[0].message)
  }

  module.exports = { lookUpGenre, notFound, badRequest}