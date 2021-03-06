let express = require('express');
let router = express.Router();
let Article = require('../models/Article.js');

router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

router.get("/api/saved", function(req, res) {
  
  // Query Mongo for the Articles
   Article.find({}, function(err, docs){
      if (err){
        console.log(err);
      } 
      else {
        res.json(docs);
      }
   });

});


router.post("/api/saved", function(req, res) {
  let entry = new Article (req.body);
  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});

router.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      res.sendStatus(200);
    }
  });

});


router.get("*", function(req, res) {
  res.redirect("/");
});


// ================================
// Export Router to Server.js
module.exports = router;