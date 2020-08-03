
const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const app = express()

app.set("view engine", ejs)

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);







app.listen(3000, function(){
  console.log("Successfully started the local server");
})
