const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const listOfOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listOfOneBlog);
    assert.strictEqual(result, 5);
  });

  const listOfBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1700",
      title: "Whatever",
      author: "Jonne",
      url: "https://dummy/jonne/whatever.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1711",
      title: "Duh!",
      author: "Homer",
      url: "https://dummy/homer-os/duh.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has 3 blogs, each with 5 likes, equals the likes of that", () => {
    const result = listHelper.totalLikes(listOfBlogs);
    assert.strictEqual(result, 15);
  });
});

describe("favorite blog", () => {
  const expectedListIndex = 3;
  const numberOfMostLikes = 42;
  const listWithBlogs = [
    {
      _id: "5a422aa71b54a676234d1799",
      title: "My least liked blog",
      author: "Jonne B. Bad",
      url: "https://dummy/jonne/mllb.pdf",
      likes: 1,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1700",
      title: "How I got most likes!",
      author: "Jonne B. Good",
      url: "https://dummy/jonne/higml.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1711",
      title: "Duh, whaterver",
      author: "Homer O. S.",
      url: "https://dummy/homer-os/duh.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1722",
      title: "You shall not pass!",
      author: "G. Gray",
      url: "https://dummy/gg/nopass.pdf",
      likes: numberOfMostLikes,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1733",
      title: "Mellon of Moria, door security",
      author: "Gimli",
      url: "https://dummy/gsog/doors.pdf",
      likes: numberOfMostLikes,
      __v: 0,
    },
  ];

  test("when list has several blogs, two having tie in most likes, result is first of two", () => {
    const result = listHelper.favoriteBlog(listWithBlogs);
    assert.deepStrictEqual(
      result.likes,
      listWithBlogs[expectedListIndex].likes
    );
    // Checking also title to catch possible test error where list is not in expected
    // order anymore.
    assert.deepStrictEqual(
      result.title,
      listWithBlogs[expectedListIndex].title
    );
  });
});

describe("most blogs", () => {
  test("when list has several blogs and several have tie in most number of blogs, result is the first one", () => {
    // Sample array of objects
    const listOfBlogs = [
      {
        _id: "5a422aa71b54a676234d1722",
        title: "My first blog",
        author: "Big Blogger",
        url: "https://dummy/bb/first.pdf",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1711",
        title: "Tiny's blog",
        author: "Tiny Liked-Most",
        url: "https://dummy/tb/tinyblog.pdf",
        likes: 120,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1733",
        title: "My second blog",
        author: "Big Blogger",
        url: "https://dummy/bb/second.pdf",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1744",
        title: "My third blog",
        author: "Big Blogger",
        url: "https://dummy/bb/third.pdf",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1755",
        title: "A blog",
        author: "Other Blogger",
        url: "https://dummy/ob/a.pdf",
        likes: 2,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1766",
        title: "Bee blog",
        author: "Other Blogger",
        url: "https://dummy/ob/b.pdf",
        likes: 19,
      },
      {
        _id: "5a422aa71b54a676234d1777",
        title: "Ceed blog",
        author: "Other Blogger",
        url: "https://dummy/ob/c.pdf",
        likes: 9,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(listOfBlogs);
    // result: { author: <name>, blogs: <number of blogs> }
    assert.strictEqual(result.author === "Big Blogger", true);
  });
});
describe("most likes", () => {
  test("when list has several blogs and several have tie in most number of likes, result is the first one", () => {
    // Sample array of objects
    const listOfBlogs = [
      {
        _id: "5a422aa71b54a676234d1722",
        title: "My first blog",
        author: "Big Blogger",
        url: "https://dummy/bb/first.pdf",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1711",
        title: "Tiny's blog",
        author: "Tiny Liked-Most",
        url: "https://dummy/tb/tinyblog.pdf",
        likes: 120,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1733",
        title: "My second blog",
        author: "Big Blogger",
        url: "https://dummy/bb/second.pdf",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1744",
        title: "My third blog",
        author: "Big Blogger",
        url: "https://dummy/bb/third.pdf",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1755",
        title: "A blog",
        author: "Other Blogger",
        url: "https://dummy/ob/a.pdf",
        likes: 2,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d1766",
        title: "Bee blog",
        author: "Other Blogger",
        url: "https://dummy/ob/b.pdf",
        likes: 19,
      },
      {
        _id: "5a422aa71b54a676234d1777",
        title: "Ceed blog",
        author: "Other Blogger",
        url: "https://dummy/ob/c.pdf",
        likes: 9,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(listOfBlogs);
    // result: { author: <name>, likes: <total number of likes> }
    assert.strictEqual(
      result.author === "Tiny Liked-Most" && result.likes === 120,
      true
    );
  });
});
