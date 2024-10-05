import React, { useState, useEffect } from 'react';
import './BlogCarousel.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import profileimg from "../Assets/profileimg.png";

const BlogCarousel = () => {
  const [blogData, setBlogData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { condition, category } = useParams();
  const itemsPerPage = 2;

  // Fetch blog data based on the condition and category
  useEffect(() => {
    const fetchBlogs = async () => {
      let apiUrl;

    // Ensure 'condition' or 'category' is defined
    // if (!condition) {
    //   console.error("Condition is undefined or empty");
    //   setLoading(false);
    //   return;
    // }
       // Handle different API calls based on category
    switch (category.toLowerCase()) {
      case 'recent blog':
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/recent-blogs`; // Update with actual route for recent blogs
        break;

      case 'most reads':
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/most-read-blogs`; // Update with actual route for most reads
        break;

      case 'recommended reading':
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/recommended-blogs`; // Update with actual route for recommended reading
        break;

      default:
        // Fallback for conditions with spaces (e.g., diseases)
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/category/${category}`;
        break;
    }
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });

        setBlogData(response.data.blogs || []); // Ensure to use response.data.blogs as per your backend structure
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [condition, category]); // Also include category in the dependency array

  // Filter blogData based on search term
  const filteredBlogs = blogData.filter((blog) => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? blogData.length - itemsPerPage : currentIndex - itemsPerPage);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + itemsPerPage) % blogData.length);
  };

  const visibleCards = filteredBlogs.slice(currentIndex, currentIndex + itemsPerPage);

  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const bufferToBase64 = (buffer) => {
    if (buffer?.type === "Buffer" && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/jpeg;base64,${btoa(binary)}`;
    } else {
      console.error("Unexpected buffer type:", typeof buffer);
      return "";
    }
  };
  
  const getProfileImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return "Loading Image";
    }
  };

  return (
    <div>
      <div className="featured-b" style={{ textAlign: 'center', paddingTop: '40px' }}>BLOGS</div>
      <br />
      <br />
      <div className="featured-title">Featured</div>

      <div className="carousel-container67">
        <button className="carousel-btn prev" onClick={handlePrev}>&#60;</button>

        <div className="cards-wrapper">
          {visibleCards.map((card) => (
            <div key={card.id} className="card">
              <div className="card-content">
                <img src={getProfileImage(card.image)} alt={card.title} className="card-image04" />
                <div className="text-content">
                  <h5>{card.title}</h5>
                  <h6>{card.subtitle}</h6>
                  <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(card?.description)
                          ? card.description.length > 140
                            ? DOMPurify.sanitize(truncateDescription(card.description, 20))
                            : DOMPurify.sanitize(card.description)
                          : "No Description Available",
                      }}
                    ></p>
                  <a href={card.link} className="read-more-btn">Read More →</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={handleNext}>&#62;</button>
      </div>

      {/* Search and Filters */}
      <div className="blog-search">
        <input 
          type="text" 
          placeholder="Search for Blogs..." 
          className="search-input" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <br />
        <div className="filters">
          <div className="featured-title">ALL POST</div>
          <div>
            <select className="filter-dropdown">
              <option>Condition Type</option>
              {/* Add more options */}
            </select>
            <select className="filter-dropdown">
              <option>All Specialties</option>
              {/* Add more options */}
            </select>
            <select className="filter-dropdown">
              <option defaultValue>Sort By: Relevance</option>
              <option>Latest</option>
              <option>Oldest</option>
              {/* Add more options */}
            </select>
          </div>
        </div>
      </div>

      {/* Paginated Blog List */}
      <div className="paginated-list-container67">
        <div className="card-container67">
          {currentItems.map((item) => (
            <div key={item.id} className="cards98">
              <img src={getProfileImage(item.image)} alt={item.title} className="card-image67" />
              <div className="card-content67">
                <span className="category67">{item.category}</span>
                <h3>{item.title}</h3>
                <p
                  className="description67"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.description)
                      ? item.description.length > 140
                        ? DOMPurify.sanitize(truncateDescription(item.description, 20))
                        : DOMPurify.sanitize(item.description)
                      : "No Description Available",
                  }}
                ></p>
                <div className="author-details67">
                  <span><img src={profileimg} alt="Author" className="author-image67" /></span>
                  <span>{item.author}</span>
                  <span className="date67">{moment(item.date).format("MMMM DD, YYYY")}</span>
                </div>
                <a href="#" className="read-more67">Read More &rarr;</a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination67">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCarousel;
