import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://blog-platform-backend-xn4f.onrender.com/api/posts", {
        title,
        content,
        category,
        author: "Anish",
      });

      alert("Post Created Successfully");
      navigate("/home");
    } catch (error) {
      alert("Failed To Create Post");
    }
  };

  return (
    <div className="home-container">
      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          background: "#133b6f",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
        }}
      >
        <h1 className="title">
          CREATE NEW POST
        </h1>

        <form onSubmit={createPost}>
          <input
            className="search-box"
            style={{
              width: "95%",
              marginBottom: "15px",
            }}
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            className="comment-input"
            style={{
              width: "95%",
              height: "180px",
              marginBottom: "15px",
            }}
            placeholder="Write your content here..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <br />

          <select
            className="category-box"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              Select Category
            </option>
            <option value="Technology">
              Technology
            </option>
            <option value="Programming">
              Programming
            </option>
            <option value="AI">
              AI
            </option>
            <option value="Web Development">
              Web Development
            </option>
            <option value="Travel">
              Travel
            </option>
            <option value="Food">
              Food
            </option>
            <option value="Gaming">
              Gaming
            </option>
            <option value="Movies">
              Movies
            </option>
            <option value="Music">
              Music
            </option>
            <option value="Sports">
              Sports
            </option>
            <option value="Education">
              Education
            </option>
            <option value="Health">
              Health
            </option>
            <option value="Lifestyle">
              Lifestyle
            </option>
            <option value="Business">
              Business
            </option>
            <option value="Finance">
              Finance
            </option>
          </select>

          <br />
          <br />

          <button
            className="create-btn"
            type="submit"
          >
            Publish Post
          </button>

          {" "}

          <button
            className="delete-btn"
            type="button"
            onClick={() =>
              navigate("/home")
            }
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;