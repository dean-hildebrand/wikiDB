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

// app.route allows for multiple methods to chain to the same route
app
  .route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res) {
    // create new article and save the key values.
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    // Check for err if none, then save article
    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles");
      } else {
        res.send(err);
      }
    });
  });

// ///////////////////////Request targeting Specific article ////////////////

app
  .route("/articles/:articleTitle")

  .get(function(req, res) {
    Article.findOne({ title: req.params.articleTitle }, function(
      err,
      foundArticle
    ) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found");
      }
    })
  })

  .put(function(req, res) {
    Article.updateOne(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content}, {overwrite: true},
      function(err){
      if (!err) {
        res.send("Successfully edited the article")
      }
    })
})

.patch(function(req, res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if (!err) {
        res.send("Successfully updated the article")
      } else {
        res.send(err)
      }
    }
  )
})

.delete(function(req, res){
  Article.deleteOne({title: req.params.articleTitle}, function(err){
    if (!err) {
      res.send("Article successfully deleted")
    } else {
      res.send(err)
    }
  })
})

app.listen(3000, function() {
  console.log("Successfully started the local server");
});

// Restful GET route for ALL articles
// app.get("/articles", function(req, res) {
//   Article.find({}, function(err, foundArticles) {
//     if (!err) {
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });

// Restful POST route to add a NEW article
// app.post("/articles", function(req, res) {
//   // create new article and save the key values.
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//   // Check for err if none, then save article
//   newArticle.save(function(err) {
//     if (!err) {
//       res.send("Successfully added a new article");
//     } else {
//       res.send(err);
//     }
//   });
// });

// app.delete("/articles", function(req, res) {
//   Article.deleteMany(function(err) {
//     if (!err) {
//       res.send("Successfully deleted all articles");
//     } else {
//       res.send(err);
//     }
//   });
// });
