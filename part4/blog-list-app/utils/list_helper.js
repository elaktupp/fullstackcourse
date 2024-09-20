const totalLikes = (blogs) => {
  //
  const cbSumUpLikes = (result, blog) => {
    return result + blog.likes;
  };
  // result contains sum of likes from earch blog
  // blog is next blog of which likes are added to result
  return blogs.reduce(cbSumUpLikes, 0);
};

module.exports = { totalLikes };
