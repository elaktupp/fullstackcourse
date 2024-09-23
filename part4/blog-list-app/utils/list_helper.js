const _ = require("lodash");

const totalLikes = (blogs) => {
  // callback function called by reduce for each item in array
  // with parameters:
  // result - contains sum of likes from earch blog
  // blog - is next blog of which likes are added to result
  const cbSumUpLikes = (result, blog) => {
    return result + blog.likes;
  };

  return blogs.reduce(cbSumUpLikes, 0);
};

const favoriteBlog = (blogs) => {
  // Note that the blog data gets slightly simplified here
  // as proposed in exercise decription.
  const initialBlog = {
    title: "title",
    author: "author",
    likes: -1, // initial value must be smaller than in any real blog
  };
  // This returns blog with most likes, in case there
  // are more than one blog with same amount of likes
  // the first one found will be the result.
  return blogs.reduce((result, blog) => {
    if (result.likes < blog.likes) {
      return { title: blog.title, author: blog.author, likes: blog.likes };
    } else {
      return result;
    }
  }, initialBlog);
};

const mostBlogs = (blogs) => {
  let name = "";
  let nbrOfblogs = 0;

  // Creates object where author name is key and each has list of blogs.
  const groupedByAuthor = _.groupBy(blogs, "author");

  // Array where each authors are sorted according to number of blogs,
  // one with most blogs comes first. Note: Equal number of blocks is not concidered.
  const mostBlogsByAuthor = _.orderBy(groupedByAuthor, ["length"], ["desc"]);

  if (mostBlogsByAuthor != null && mostBlogsByAuthor[0] != null) {
    // First item in the list [0] has list of author's blogs,
    // we can get the name of the author from first blog in the list [0].
    name = mostBlogsByAuthor[0][0].author;
    nbrOfblogs = mostBlogsByAuthor[0].length;
  }

  return { author: name, blogs: nbrOfblogs };
};

const mostLikes = (blogs) => {
  // Creates object where author name is key and each has list of blogs.
  const groupedByAuthor = _.groupBy(blogs, "author");

  // Collect list of authors with total number of likes.
  const likesPerAuthor = [];
  _.forEach(groupedByAuthor, (authorsBlogs) => {
    likesPerAuthor.push({
      author: authorsBlogs[0].author,
      likes: _.sumBy(authorsBlogs, (b) => b.likes),
    });
  });

  // Sort author list by total number of likes.
  const mostLikedAuthor = _.orderBy(likesPerAuthor, ["likes"], ["desc"]);

  return { author: mostLikedAuthor[0].author, likes: mostLikedAuthor[0].likes };
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
