import React, { useState } from 'react';
import './newsroom.css'; 
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ABC from './Newsroom-assets/ABC.png';
import Foxnews from './Newsroom-assets/Fox_news.png';
import NBC from './Newsroom-assets/NBC.png';
import AP from './Newsroom-assets/AP.png';
import BENZINGA from './Newsroom-assets/BENZINGA.png';
import newsroom from './Newsroom-assets/newsroom.png';
import { BiSolidShareAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';

const NewsRoom = () => {
  const logos = [
    { src: ABC, alt: 'ABC' },
    { src: Foxnews, alt: 'Foxnews' },
    { src: NBC, alt: 'NBC' },
    { src: AP, alt: 'AP' },
    { src: BENZINGA, alt: 'Benzinga' },
    { src: ABC, alt: 'ABC' },
    { src: Foxnews, alt: 'Foxnews' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleLogosCount = 5; 
  const handleNext = () => {
    if (currentIndex < logos.length - visibleLogosCount) {
        setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleLogos = logos.slice(currentIndex, currentIndex + visibleLogosCount);
  
  const cardsData = [
    { id: 1, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.facebook.com' },
    { id: 2, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.linkedin.com' },
    { id: 3, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.facebook.com' },
    { id: 4, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.twitter.com' },
    { id: 5, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 6, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.facebook.com' },
    { id: 7, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.facebook.com' },
    { id: 8, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.twitter.com' },
    { id: 9, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 10, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.facebook.com' },
    { id: 11, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 12, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 13, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 14, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 15, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 16, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 17, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 18, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 19, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 20, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 21, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 22, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
    { id: 23, date: "18 Oct, 2023", title: "Managing Chronic Pain: Tips and Strategies for a Better Quality of Life...", image: newsroom, link: 'https://www.google.com' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  // Define the card showing 6 card
  const cardsPerPage = 6; 
  const totalPages = Math.ceil(cardsData.length / cardsPerPage); 

  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get the current cards based on currentPage
  const currentCards = cardsData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  return (
    <div className='New-rooms-container'>
        <section className="New-rooms-carousel-header">
            <h2>News<span> Room</span></h2>
            <p>Where we have been featured</p>
            <div className="New-rooms-carousel-content">
                <button className="New-rooms-carousel-arrow New-rooms-left-arrow" onClick={handlePrev} disabled={currentIndex === 0}>
                <IoIosArrowBack />
                </button>
                <div className="New-rooms-carousel-logos-head">
                    {visibleLogos.map((logo, index) => (
                        <div className="New-rooms-carousel-logo" key={index}>
                            <img src={logo.src} alt={logo.alt} />
                        </div>
                    ))}
                </div>
                <button className="New-rooms-carousel-arrow New-rooms-right-arrow" onClick={handleNext} disabled={currentIndex >= logos.length - visibleLogosCount}>
                <IoIosArrowForward />
                </button>
            </div>
        </section>

        <section className="New-rooms-card-container">
            <div className="New-rooms-card-inside-container">
                {currentCards.map((card) => (
                    <div className="New-rooms-card-head" key={card.id}>
                        <img src={card.image} alt={card.title} />
                        <div className="New-rooms-card-content-header">
                            <div className="New-rooms-card-date-and-social">
                                <p>{card.date}</p>
                                <BiSolidShareAlt className='new-rooms-share-icons'/>
                            </div>
                            <h3 className="New-rooms-card-title">{card.title}</h3>
                            <Link to={card.link} target="_blank" rel="noopener noreferrer"><button>Read more</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="New-rooms-pagination">
            <button
                className="New-rooms-prev"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            <button
                className={currentPage === 1 ? "New-rooms-page New-rooms-active" : "New-rooms-page"}
                onClick={() => handleClick(1)}
            >
                1
            </button>

            {currentPage > 3 && <p className="New-rooms-dots">...</p>}

            {currentPage > 2 && (
                <button className="New-rooms-page" onClick={() => handleClick(currentPage - 1)}>
                    {currentPage - 1}
                </button>
            )}

            {currentPage !== 1 && currentPage !== totalPages && (
                <button className="New-rooms-page New-rooms-active">{currentPage}</button>
            )}

            {currentPage < totalPages - 1 && (
                <button className="New-rooms-page" onClick={() => handleClick(currentPage + 1)}>
                    {currentPage + 1}
                </button>
            )}

            {currentPage < totalPages - 2 && <p className="New-rooms-dots">...</p>}

            <button
                className={currentPage === totalPages ? "New-rooms-page New-rooms-active" : "New-rooms-page"}
                onClick={() => handleClick(totalPages)}
            >
                {totalPages}
            </button>

            <button
                className="New-rooms-next"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </section>
    </div>
  );
};

export default NewsRoom;
