  
  const notFound = (res) => {
      return res.status(404).send("genre not found :(");
  }
  
  const badRequest = (res, error) => {
      return res.status(400).send(error.details[0].message)
  }

  module.exports = {  notFound, badRequest}