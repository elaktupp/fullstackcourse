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

module.exports = { totalLikes, favoriteBlog };
