import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts"
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/comments"
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${id}`
      );

      alert("Post Deleted");
      fetchPosts();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const addComment = async (postId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/comments",
        {
          postId,
          username: "Anish",
          text: commentText,
        }
      );

      setCommentText("");
      fetchComments();
    } catch (error) {
      alert("Comment Failed");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">

      <h1 className="title">
        BLOG PLATFORM
      </h1>

      <div className="top-bar">
        <Link to="/create">
          <button className="create-btn">
            Create Post
          </button>
        </Link>

        <button
          className="create-btn"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search Posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        className="category-box"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Programming">Programming</option>
        <option value="AI">AI</option>
        <option value="Web Development">Web Development</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Gaming">Gaming</option>
        <option value="Movies">Movies</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Business">Business</option>
        <option value="Finance">Finance</option>
      </select>

      {filteredPosts.map((post) => (
        <div
          key={post._id}
          className="post-card"
        >
          <h2 className="post-title">
            {post.title}
          </h2>

          <p>{post.content}</p>

          <p className="post-category">
            {post.category}
          </p>

          <p className="post-author">
            By {post.author}
          </p>

          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/edit/${post._id}`)
            }
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deletePost(post._id)
            }
          >
            Delete
          </button>

          <div className="comment-section">
            <h3>Comments</h3>

            {comments
              .filter(
                (comment) =>
                  comment.postId === post._id
              )
              .map((comment) => (
                <div
                  key={comment._id}
                  className="comment"
                >
                  <strong>
                    {comment.username}
                  </strong>
                  : {comment.text}
                </div>
              ))}

            <input
              className="comment-input"
              type="text"
              placeholder="Add Comment..."
              value={commentText}
              onChange={(e) =>
                setCommentText(
                  e.target.value
                )
              }
            />

            <button
              className="comment-btn"
              onClick={() =>
                addComment(post._id)
              }
            >
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;