import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://blog-platform-backend-xn4f.onrender.com/api/posts/${id}`,
        {
          title,
          content,
        }
      );

      alert("Post Updated Successfully");
      navigate("/home");
    } catch (error) {
      alert("Update Failed");
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
          EDIT POST
        </h1>

        <form onSubmit={updatePost}>
          <input
            className="search-box"
            style={{
              width: "95%",
              marginBottom: "15px",
            }}
            type="text"
            placeholder="New Title"
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
            placeholder="New Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <br />

          <button
            className="edit-btn"
            type="submit"
          >
            Update Post
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

export default EditPost;