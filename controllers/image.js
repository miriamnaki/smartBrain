const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'fac5c841f3114888ba420b05a355df61'
 });

 const handleApiCall = (req, res) => {
   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data => {
    res.json(data)
   }) 
   .catch(err => res.status(400).json('Unable to use'))
 }

 const handleImagePost = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries)
  })
  }

  module.exports = {
    handleApiCall: handleApiCall,
    handleImagePost : handleImagePost
  }