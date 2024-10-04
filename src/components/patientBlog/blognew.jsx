import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';
import profileimg from "../Assets/profileimg.png";
import UserBlogComments from './UserBlogComments'
import './blognew.css';
import axios from 'axios';

const Blognew = () => {
  const { id } = useParams();
  const [blogPageData, setBlogPageData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ comment: '', save: false });
  const [isCurrentFocus, setIsCurrentFocus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [comments ,setComments] = useState([]);

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!newComment.comment.trim()) {
      setErrorMsg('Please enter a comment');
      return;
    }

    try {
      // Sending a POST request to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patient/blogs/comment/${blogPageData._id}`,
        {
          comment: newComment.comment,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Success: Comment added
        setNewComment({ comment: '', save: false }); // Clear the comment input
        alert('Comment added successfully!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMsg('Failed to post comment. Please try again.');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdataforblogs = async () => {
      try {
        // Fetch blog categories and recent blogs
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/blogs`, { withCredentials: true });
        const data = response.data;
        if (response.ok) {
          setLoading(false);
        }
        console.log(data);
        setRelatedBlogs(data.recentBlogs);
        setCategories(data.categories);

        // Fetch blog post details
        const blogPostresponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/blogs/view/${id}`, { withCredentials: true });
        const blogData = blogPostresponse.data;
        setBlogPageData(blogData.blog);
  setComments(blogData.blog.comments)

        

        console.log(blogData.blog)

        // Fetch author details if the blog has an author
        if (blogPageData?.authorId) {
          setLoading(false);
          const id = blogPageData.authorId
          const authordataResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/author/${id}`, { withCredentials: true });
          setAuthorData(authordataResponse.data);
          console.log(authordataResponse.data);
        }

      } catch (error) {
        setLoading(false);

        console.error('Error loading blog data:', error);
      }
    };
    fetchdataforblogs();
  }, [id, blogPageData?.authorId]);

  console.log(blogPageData);
  console.log(id);  


  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getProfileImage = (formData) => {
    if (formData?.data?.type === 'Buffer') {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === 'string') {
      return `data:image/jpeg;base64,${formData.data}`;
    }
  };

  const bufferToBase64 = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/jpeg;base64,${btoa(binary)}`;
    } else {
      console.error('Unexpected buffer type:', typeof buffer);
      return '';
    }
  };
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
  const handleShowall = () => {
    if (blogPageData?.conditions?.length > 0) {
      navigate(`/blogs/ShowAll/${blogPageData.conditions[0]}`);
    }
  };
  

  if (loading) {
    return (
      <div className="blogPage-loading-screen">
        <div className="blogPage-loading-spinner"></div>
      </div>
    );
  }
  return (
    <Container className="nutrition-tips-container">
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} className="back-button" style={{ marginBottom: '20px' }}>
        ← Back
      </Button>

      {/* Header Section */}
      <div className="nutrition-tips-header">
        <h1 className="nutrition-tips-title">{blogPageData?.title}</h1>
      </div>

      {/* Subheader */}
      <p className="nutrition-tips-subheader">
        <span>
          <img className='small-profile' src={getProfileImage(authorData?.author?.profilePicture)} alt="Author" />
        </span>
        &nbsp; {blogPageData?.author} &nbsp; | &nbsp; August 20, 2024 &nbsp; | &nbsp; {blogPageData?.readCount} Read &nbsp; | &nbsp;{' '}
        <span>
          <img src="../heart.png" alt="Views" />
        </span>
        &nbsp;
        {blogPageData?.views ? blogPageData?.readCount + " Views" : "654K Views"}
      </p>

      {/* Image Section */}
      <div className="nutrition-tips-image-container">
        <img
          src={getProfileImage(blogPageData?.image)}
          alt={blogPageData?.title || "Blog image"}
          className="nutrition-tips-image"
        />
      </div>

      {/* Content Section */}
      <div className="nutrition-tips-content">
        <div
          dangerouslySetInnerHTML={{
            __html: blogPageData?.description
          }}
        ></div>
        {/* <p style={{ marginTop: '30px' }} className="nutrition-tips-content-paragraph">{blogPageData?.description || "No content available"}</p> */}

        {/* <p style={{ marginTop: '30px' }} className="nutrition-tips-content-paragraph">
          Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
        </p>
        <h2 className="nutrition-tips-content-heading">Section 1.10.33 of "de Finibus Bonorum et Malorum"</h2>
        <p className="nutrition-tips-content-paragraph">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>

        <h1 className="nutrition-tips-content-headings">Section</h1>
        <p className="nutrition-tips-content-paragraph">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>

        <h1 className="nutrition-tips-content-headings">Section 1.10.33</h1>
        <p className="nutrition-tips-content-paragraph">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p> */}
      </div>

      {/* Social Media */}
      <div className="social-media-container">
        <div className="social-icons">
          <a href="#" className="icon">
            <FaFacebook />
          </a>
          <a href="#" className="icon">
            <FaTwitter />
          </a>
          <a href="#" className="icon">
            <FaInstagram />
          </a>
        </div>
        <p className="helpful-text">
          Was this helpful? &nbsp;&nbsp;
          <span>
            <FaThumbsUp style={{ fontSize: '24px', marginTop: '-10px' }} />
          </span>
        </p>
      </div>

      {/* About Author */}
      <div className="about-author-section">
        <h1 className="nutrition-tips-content-headingse">About the Author</h1>
        <div className="author-cards">
          <img
            src={getProfileImage(authorData?.author?.profilePicture)}
            alt={authorData?.author?.name}
            className="author-image"
          />
          <div className="author-info">
            <h5 className="author-infos">{authorData?.author?.name}</h5>
            <p style={{ color: '#787887' }}>
              {authorData?.author?.speciality
                .filter(speciality =>
                  blogPageData?.conditions?.some(condition => condition.toLowerCase() === speciality.toLowerCase())
                )
                .map((matchedSpeciality, index, array) => (
                  <span key={index}>
                    {matchedSpeciality}
                    {/* Add a comma between specialties only if there are more than one */}
                    {array.length > 1 && index < array.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </p>


            <p style={{ color: '#787887' }}>{authorData?.author?.experience + " years experience overall" || "xy years experience overall"}</p>
            <p style={{ color: '#272848', marginTop: '10px' }}>
              <b>{authorData?.author?.state}, {authorData?.author?.country}</b>
            </p>
            <p style={{ color: '#272848' }}>{authorData?.author?.aboutMe}</p>
          </div>
        </div>
      </div>

      {/* Leave a Comment */}
      <div className="UserBlog-leave-comment-cnt">
      <h4 className="UserBlog-comments-title">Leave a Comment</h4>
      <form onSubmit={handlePublish}>
        <div className="UserBlog-textarea-comment-post">
          <textarea
            value={newComment.comment}
            className="UserBlog-input-textarea-commit-post"
            onFocus={() => setIsCurrentFocus("comment")}
            onBlur={() => setIsCurrentFocus(null)}
            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
          />
          <p
            className={`UserBlog-input-placeholder-commit-post ${newComment.comment || isCurrentFocus === "comment" ? "focused" : ""}`}
          >
            Comment <span style={{ color: "red" }}> *</span>
          </p>
        </div>

        <div className="UserBlog-comment-term-conformation-cnt">
          <input
            type="checkbox"
            checked={newComment.save}
            onChange={() => setNewComment({ ...newComment, save: !newComment.save })}
            className="UserBlog-comment-checkbox"
          />
          <span className="UserBlog-checkbox-comment-txt">
            Save my name, email, and website in this browser for the next time I comment.
          </span>
        </div>
        <button type="submit" className="UserBlog-submit-button">Post Comment</button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>} {/* Display error message */}
    </div>
    {/* Comments */}
    <UserBlogComments comments={comments} BlogPageData={blogPageData}/>
      {/* Similar Articles */}
      <div className="similar-articles-section">
        <h2 className="nutrition-tips-content-headingse">Similar Articles</h2>
        <div className="articles">
          {relatedBlogs.slice(0,3).map((blog) => (
            <div key={blog.id} className="article-card">
              <img src={getProfileImage(blog.image)} alt={blog.title} className="article-image" />
              <div className="article-info">
                <span className="category">{blog.categories.map((category) => (
                  category
                ))}</span>
                <span className="categorysimg"><img className="" src='../Vector.png' /></span>
                <p className="date">{formatDate(blog.date)}</p>
                <h3 className="article-title">{blog.title}</h3>

                <p dangerouslySetInnerHTML={{
                  __html: truncateDescription(blogPageData?.description, 20)
                }}></p>
                <a href={blog.link} className="learn-more">Learn More </a>
              </div>


            </div>
          ))}
        </div>
        <button className="view-all"onClick={handleShowall}>
        view all
      </button>
      </div>
    </Container>
  );
};

export default Blognew;
