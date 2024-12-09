
import React from "react";
import { Link } from "react-router-dom";
import "./tail.css";

const Footer = () => {
  return (
    <footer className="flex overflow-hidden flex-col px-20 pt-12 pb-8 mt-32 w-full bg-slate-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
        <div className="flex flex-col">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d52bb1fe9d8e00522f902f7cb874aa61238c031e0222432be335b62ecadb363a?placeholderIfAbsent=true&apiKey=4c137795ca7946528ace3d8e35f13cac"
            alt="Company Logo"
            className="object-contain max-w-full aspect-[4.35] w-[135px]"
          />
          <div className="flex gap-5 items-start mt-6">
            <a href="#" aria-label="Facebook">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d818f73e0a97952b68f89a246488a5d2bd7f1241f69fa39759d959b4dc388e86?placeholderIfAbsent=true&apiKey=4c137795ca7946528ace3d8e35f13cac"
                alt=""
                className="object-contain shrink-0 aspect-square w-[33px]"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee8c2aa5f7ca458bd29c0dcf2406d2fa009472d05d9be7aae3e7984df6597aea?placeholderIfAbsent=true&apiKey=4c137795ca7946528ace3d8e35f13cac"
                alt=""
                className="object-contain shrink-0 aspect-[1.03] w-[34px]"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/497acb2fa12624406be82270fac3decf9cea5ec59bf31d9385ca172d3613f246?placeholderIfAbsent=true&apiKey=4c137795ca7946528ace3d8e35f13cac"
                alt=""
                className="object-contain shrink-0 aspect-square w-[33px]"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 items-start min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col">
            <h3 className="w-14 text-base font-medium leading-loose whitespace-nowrap rounded-none text-stone-950">
              Explore
            </h3>
            <nav className="flex flex-col mt-8 text-sm leading-loose text-neutral-600">
              <Link to="https://medxbay.com">Home Page</Link>
              <Link to="/about" className="mt-5">
                About Us
              </Link>
              <Link to="/faq" className="mt-5">
                FAQs
              </Link>
              <Link to="/contact" className="mt-5">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col w-[106px]">
            <h3 className="w-10 text-base font-medium leading-loose whitespace-nowrap rounded-none text-stone-950">
              Legal
            </h3>
            <nav className="flex flex-col mt-8 text-sm leading-loose text-neutral-600">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms" className="mt-5">
                Terms of Service
              </Link>
              <Link to="/docs" className="mt-5">
                Documentation
              </Link>
              <Link to="/sitemap" className="mt-5">
                Site Map
              </Link>
            </nav>
          </div>
          <div className="flex flex-col min-w-[240px] w-[294px]">
            <h3 className="text-base font-medium leading-loose whitespace-nowrap rounded-none text-stone-950 w-[74px]">
              Subscribe
            </h3>
            <div className="flex flex-col mt-8 w-full max-w-[294px]">
              <p className="text-sm leading-loose text-neutral-600">
                Subscribe to get the latest news from us
              </p>
              <form className="flex overflow-hidden gap-5 justify-between pl-5 mt-5 w-full bg-white rounded-md border border-solid border-slate-300">
                <input
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  className="flex-grow text-base leading-loose text-neutral-600 bg-transparent border-none focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex gap-2.5 justify-center items-center px-4 w-14 h-14 bg-blue-600 rounded-md min-h-[56px]"
                  aria-label="Subscribe"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e07516c903ff05485bd07f327e8b9589833927b29dd5538f303f3b9a27682c2?placeholderIfAbsent=true&apiKey=4c137795ca7946528ace3d8e35f13cac"
                    alt=""
                    className="object-contain self-stretch my-auto w-6 aspect-square"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className="self-center mt-16 text-sm leading-loose text-center text-neutral-600 max-md:mt-10">
        © 2024 Global Wellness Alliance. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
