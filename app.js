const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// Restful GET route for ALL articles
app.get("/articles", function(req, res) {
  Article.find({}, function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

// Restful POST route to add a NEW article
app.post("/articles", function(req, res){
  // create new article and save the key values. r
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  // Check for err if none, then save article
  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article")
    } else {
      res.send(err)
    }
  })
})

app.listen(3000, function() {
  console.log("Successfully started the local server");
});
