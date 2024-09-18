//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');// always require lodash with const ' _ '['a lodash' NOT BY THE WORD 'lodash',as we do while requiring other libraries..] otherwise it wont work


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

var posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {//the'/' is the homepage route
  res.render("home", { homeContent: homeStartingContent, posts: posts });//res.render method is to render an ejs template file all it needs is a folder named 'views'which has all ejs files already made | { here 'key: value' is written n always we pass the 'key' in our ejs file in its <%= tag %> and NOT its value}

});



app.get("/about", function (req, res) {//the is the about page route
  res.render("about", { aboutText: aboutContent });
});

app.get("/contact", function (req, res) {//the is the contact page route
  res.render("contact", { contactText: contactContent });
});

app.get("/compose", function (req, res) {//the is the compose page route
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.composeTitle,
    body: req.body.composeContent
  };//remember that the main reason we made an object of content n title is to print the title n content in our ejs templates by '.title n .body' methods

  posts.push(post);

  // res.render("compose", { postTitle: posts, postContent: posts });
  res.redirect("/");
  // console.log("Post Title: " + post.title + " Post Content: " + post.body);
});

app.get('/posts/:postsId', (req, res) => {
  const requestedTitle = _.kebabCase(req.params.postsId);

  posts.forEach(function (post) {
    const storedTitle = _.kebabCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.body//use the same object names we used in compose page
      });
    } else {
      app.get("/notfound", function (req, res) {//the is the notfound page route
        res.render("notfound");
      });
       
    }
  });

  // console.log(req.params.postsId);  
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
