const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type: String
      },
      catogary: {
        type: String
      },
      experience: {
        type: String
      },
      creator: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
      salary: {
        type: String
      },
      location: {
        type: String
      },
      description: {
        type: String
      },
      Benifits: {
        type: String
      },
      joiningDate: {
        type: String
      },
      techstack: {
        type: [String]
      },
      Applied: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
      },
      uniquestring: {
        type: String
      },
      benifits:{
        type: String
      },
      interview_process: {
        type: String
      },

})

module.exports = mongoose.model('Job', jobSchema)