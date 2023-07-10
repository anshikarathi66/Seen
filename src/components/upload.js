import React, {useRef, useState, useEffect} from "react";
import uploadimgcanva from "./images/uploadimgcanva.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCamera,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

function Upload(props) {
  const imageDescription = useRef(null);

  let uploadbigheadingstyle = {
    color: "white",
    fontWeight: "1000",
    fontSize: "10vw",
    fontFamily: "merriweather",
    position: "absolute",
    top: "10%",
    right: "10%",
    zIndex:'3'
  };

  let uploadtextstyle = {
    color: "White",
    textAlign: "right",
    fontSize: "2vw",
    fontWeight: "300",
    fontFamily: "merriweather",
    lineHeight: "250%",
    position: "absolute",
    right: "10%",
    zIndex:'3'
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div
        className="accordion-item accordion1"
        style={{ backgroundColor: "#D9ACF5" }}
      >
        {/* SHOWUP OF UPLOAD SECTION */}
        <h2
          className="accordion-header"
          style={{ position: "relative" }}
          id="flush-headingOne"
        >
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            style={{ backgroundColor: "#D9ACF5", padding: "0" }}
          >
            <img
              src={uploadimgcanva}
              className="img-fluid"
              alt="No Image Available"
              style={{
                width: "50%",
                height: "50%",
                margin: "3% 3% 3%",
                borderRadius: "15px 50px 30px 5px",
                zIndex:'2'
              }}
            />
            <div style={uploadbigheadingstyle}>UPLOAD</div>
            <div style={uploadtextstyle}>
              <FontAwesomeIcon icon={faWallet} /> Link your MetaMask Wallet
              <br />
              <FontAwesomeIcon icon={faCamera} /> Choose Your Memory
              <br />
              <FontAwesomeIcon icon={faUpload} /> Click Upload
            </div>
            <div className="position-absolute top-0 end-0" style={{height: "100%", width: "50%", backgroundColor: "#F5C6EC", borderRadius: "0 0 0 100%", zIndex:'1'}}></div>

          </button>
        </h2>

        {/* AFTER CLICK SHOWUP OF UPLOAD SECTION */}
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <div className="input-group d-flex justify-content-center align-items-center">
              <form action="/action_page.php" onSubmit ={(event) =>{
                event.preventDefault()
                const description = imageDescription.current.value;
                // const description = this.imageDescription.value
                props.uploadImage(description);
              }}>
                <div class="mb-3">
                  <input
                    class="form-control bg-transparent border-0 text-white"
                    type="file"
                    id="formFileMultiple"
                    accept=".jpg, .jpeg, .png, .bmp, .gif"
                    onChange={props.captureFile}
                    multiple
                    style={{fontSize: '1.3vw'}}
                  />
                </div>
                <div className="form-floating">
                  <input
                    className="form-control mb-3 bg-transparent border-0 text-white"
                    placeholder="Leave a comment here"
                    id="imageDescription"
                    type="text"
                    ref={input => { imageDescription.current = input; }}
                    style={{fontSize: '1.3vw'}}
                  />
                  <label className = "text-white" htmlFor="floatingTextarea" style={{fontSize: '1.3vw'}}>Write Caption</label>
                </div>
                <input className ="text-white rounded border-0" style={{ width: '30vw', height: '3vw', backgroundColor: '#89375F', fontSize: '1.3vw'}} type="submit" value="Upload" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
