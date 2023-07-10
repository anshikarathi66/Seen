import React, { useState, useEffect } from "react";
import seenlogo from "./images/seenlogo.png";
import Identicon from "identicon.js";

function Navbar(props) {
  const [navbarBg, setnavbarBg] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setnavbarBg("#F5C6EC");
      } else {
        setnavbarBg("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // NAVBAR SECTION
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{ backgroundColor: navbarBg }}
    >
      <div className="container-fluid">

        {/* logo */}
        <a
          className="navbar-brand"
          href="#"
          style={{ paddingLeft: "5vw" }}
        >
          <img
            src={seenlogo}
            alt="SEEN"
            style={{ width: "9vw", height: "3vw" }}
          />
        </a>


        {/* metamask connect */}
        <ul className="navbar-nav">
          <li className="nav-item text-nowrap d-none d-md-block">
            {/* for ethereum address */}
            <small className="text-secondary" style={{padding:'1%'}}>
              <small id="account">{props.account}</small>
            </small>
            {/* for identicon */}
            {props.account ? (
              <img
                className=""
                width="30vw"
                height="30vw"
                src={`data:image/png;base64,${new Identicon(
                  props.account,
                  30
                ).toString()}`}
                alt="Identicon"
                style={{padding:'1%'}}
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
