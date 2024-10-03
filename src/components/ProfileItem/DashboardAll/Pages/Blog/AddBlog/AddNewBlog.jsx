import React, { useRef, useState, useEffect } from "react";
import "./addnewblog.css";
import Blog from "../Blog";
import Editor from "./Editor";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewBlog = ({loadBlogs}) => {
  const [showAddNewBlog, setShowAddNewBlog] = useState(false);
  
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    category: "",
    selectedConditions: [],
    hashtags: "",
    priority: "",
    description: "",
    image: null,
    save: false,
  });
  const [showPreview, setShowPreview] = useState(false); 
  const [conditions, setConditions] = useState([]); 

  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/blog`);
        if (response.data && response.data.conditions) {
          setConditions(response.data.conditions); 
        } else {
          toast.info("Failed to fetch conditions");
        }
      } catch (error) {
        console.error("Error fetching conditions:", error);
        toast.info("Error fetching conditions from server");
      }
    };
    
    fetchConditions();
  }, []); 

  const handleConditionsChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      selectedConditions: selectedValues,
    }));
  };

  const handleAddClick = () => {
    setShowAddNewBlog(true);
  };

  const handleCancel = () => {
    setShowAddNewBlog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const categories = ["Technology", "Health", "Travel", "Food", "Lifestyle"];

  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("author", newBlog.author);
      formData.append("category", newBlog.category);
      formData.append("hashtags", newBlog.hashtags);
      formData.append("priority", newBlog.priority);
      formData.append("description", newBlog.description);
      formData.append("image", newBlog.image);
      formData.append("selectedConditions", newBlog.selectedConditions);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/blog`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data) {
         toast.info("Blog Published");
        loadBlogs();
        handleCancel();
      } else {
        toast.info("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.info("Server error occurred");
    }
  };

  
  return (
    <>
            <ToastContainer />
      {showAddNewBlog ? (
        <Blog onCancel={handleCancel} />
      ) : (
        <div className="publish-blog-container" onSubmit={handleSubmit}>
          <h2 className="blog-title">Blogs</h2>
          <form className="publish-blog-gap">
            <div className="publish-blog-header">
              <input
                type="text"
                value={newBlog.title}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
              <p className="publish-blog-placeholder">
   Title
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>
{/* 
            <div className="publish-blog-header">
              <input
                type="text"
                value={newBlog.author}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, author: e.target.value })
                }
              />
              <p className="publish-blog-placeholder">
                Author Name
                <span style={{ color: "red" }}> *</span>
              </p>
            </div> */}

            <div className="publish-blog-header">
              <select
                value={newBlog.category}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  Choose Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="publish-blog-placeholder">
              Category
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
  <p className="publish-blog-placeholder">
Conditions
    <span style={{ color: "red" }}> *</span>
  </p>
  <select
    value={newBlog.selectedConditions}
    className="publish-blog-input"
    onChange={(e) => {
      const value = Array.from(e.target.selectedOptions, option => option.value);
      setNewBlog({ ...newBlog, selectedConditions: value });
    }}
  >
    <option value="" disabled hidden>
      Choose Conditions
    </option>
    {conditions.length > 0 ? (
      conditions.map((condition, index) => (
        <option key={index} value={condition.name}>
          {condition.name}
        </option>
      ))
    ) : (
      <option disabled>No conditions available</option>
    )}
  </select>
  {/* <p className="publish-blog-placeholder">
Conditions
  </p> */}
</div>



            <div className="publish-blog-header">
              <input
                type="text"
                value={newBlog.hashtags}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, hashtags: e.target.value })
                }
              />
              <p className="publish-blog-placeholder">
                Tags (separated with a comma)
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
              <p className="publish-blog-placeholder-status">
               priority
                <span style={{ color: "red" }}> *</span>
              </p>
              <div className="publish-blog-check-aina">
                <div className="radio-input-label">
                  <input
                    type="radio"
                    id="check-high"
                    className="checkbox"
                    checked={newBlog.priority === "high"}
                    onChange={() =>
                      setNewBlog({
                        ...newBlog,
                        priority:
                          newBlog.priority === "high"
                            ? "low"
                            : "high",
                      })
                    }
                  />
                  <label htmlFor="check-high" className="radio-label">
                    High
                  </label>
                </div>
                <div className="radio-input-label">
                  <input
                    type="radio"
                    id="check-inhigh"
                    className="checkbox"
                    checked={newBlog.priority === "low"}
                    onChange={() =>
                      setNewBlog({
                        ...newBlog,
                        priority:
                          newBlog.priority === "low"
                            ? "high"
                            : "low",
                      })
                    }
                  />
                  <label htmlFor="check-high" className="radio-label">
                    Low
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="editor-and-file-container">
            <div className="editor-box">
              <Editor
                ref={quillRef}
                defaultText="Description"
                onTextChange={(content) => {
                  setNewBlog({ ...newBlog, description: content });
                }}
              />
            </div>

            <div className="publish-blog-header-file">
              <input
                type="file"
                ref={fileInputRef}
                className="publish-file-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, image: e.target.files[0] })
                }
              />
              <p className="publish-file-name">{newBlog?.image?.name}</p>

              <div className="choose-file-publish" onClick={() => fileInputRef.current.click()}>
                <span>Choose File</span>
              </div>
              <p className="publish-blog-placeholder">
                Image
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>
          </div>

          <div className="preview-toggle">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="toggle-preview-button"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>

          {showPreview && (
              <div className="blog-preview">
                <h3>Preview</h3>
                {newBlog.image && (
                  <div>
                    <strong>Image:</strong>
                    <img
                      src={URL.createObjectURL(newBlog.image)}
                      alt="Blog"
                      className="preview-image"
                    />
                  </div>
                )}
                <h2>{newBlog.title || "Blog Title"}</h2>
                {/* <p><strong>Author:</strong> {newBlog.author || "Author Name"}</p> */}
                <p><strong>Category:</strong> {newBlog.category || "Category"}</p>
                <p>
                  <strong>Conditions:</strong>{" "}
                  {newBlog.selectedConditions.length > 0
                    ? newBlog.selectedConditions.join(", ")
                    : "No Conditions Selected"}
                </p>
                <p><strong>Tags:</strong> {newBlog.hashtags || "#tags"}</p>
                <p><strong>Priority:</strong> {newBlog.priority || "Low"}</p>
                <div>
                  <strong>Description:</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: newBlog.description || "<p>No description provided.</p>",
                    }}
                  />
                </div>
             
              </div>
            )}


          <div className="publish-button">
            <div className="publish-button-inside" onClick={handlePublish}>
              <span>Request Publish</span>
            </div>
            <div className="publish-button-inside" onClick={handleAddClick} 
            style={{ background: "#3334480D", color: "black" }} >
              <span>Cancel</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AddNewBlog;
