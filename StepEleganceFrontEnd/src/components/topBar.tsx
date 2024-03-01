import { useState, useRef } from "react";
import Logo from "../assets/logo.png";
import "../components/topBar.css";

function topBar() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdown = (State: boolean) => {
    setOpen(!State);
  };
  const handleClickoutsideDropdown = (e: any) => {
    if (open && !dropdownRef.current?.contains(e.target as Node)) {
      console.log("Clicked active");
    }
  };
  window.addEventListener("click", handleClickoutsideDropdown);
  console.log(open);
  return (
    <>
      <header className="top">
        <div className="logo-container">
          <a href="/">
            <img src={Logo} alt="Logo" height="70px" width="70px" />
          </a>
        </div>
        <div className="navsection">
          <nav className="navbar">
            <div className="section-container">
              <ul>
                <li>
                  <a href="/new">New</a>
                </li>
                <li>
                  <a href="/men">Men</a>
                </li>
                <li>
                  <a href="/women">Women</a>
                </li>
                <li>
                  <a href="/kids">Kids</a>
                </li>
                <li>
                  <a href="/sales">Sales</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="inputbtt">
          <form>
            <div className="insideform"></div>
            <input
              className="searchinput"
              type="text"
              placeholder="Search..."
            />
            <label htmlFor="searchbttn" className="search-bttn">
              <i className="fas fa-search"></i>
            </label>
          </form>
          <div className="menubox">
            <div className="wishlist">
              <button>
                <i className="fas fa-heart"></i>
              </button>
            </div>
            <div className="profilebttn" ref={dropdownRef}>
              <button onClick={(e) => handleDropdown(open)}>
                <i className="fa-solid fa-user"></i>
              </button>
              {open && (
                <div className="bars">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fas fa-user"></i> Profile
                      </a>
                    </li>
                    <li>
                      <a href="/about">
                        <i className="fas fa-book"></i> About Us
                      </a>
                    </li>
                    <li>
                      <a href="/location">
                        <i className="fas fa-map"></i> Location
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-globe-asia"></i> Find Us On
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-phone"></i> Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="shoppingbag">
              <button className="whishlist-button" >
              <a href="/addtocart">
              <i className="fa-solid fa-bag-shopping"> </i>
              </a> 
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default topBar;
