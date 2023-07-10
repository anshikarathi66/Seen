import React, { useRef } from "react";
import Identicon from "identicon.js";

function Checkfeed(props) {

  let feedbigheadingstyle = {
    color: "white",
    fontWeight: "1000",
    fontSize: "10vw",
    fontFamily: "merriweather",
    position: "absolute",
    bottom: "10%",
    right: "25%",
    zIndex: "3",
  };

  let feedtextstyle = {
    color: "White",
    textAlign: "right",
    fontSize: "2vw",
    fontWeight: "300",
    fontFamily: "merriweather",
    lineHeight: "250%",
    position: "absolute",
    right: "25%",
    zIndex: "3",
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item" style={{ backgroundColor: "#D9ACF5" }}>
        {/* SHOWUP OF CHECKFEED SECTION */}
        <h2
          className="accordion-header"
          id="flush-headingTwo"
          style={{ position: "relative" }}
        >
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
            style={{ backgroundColor: "#D9ACF5", padding: "0" }}
          >
            <img
              src="https://images.pexels.com/photos/7191988/pexels-photo-7191988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="img-fluid"
              alt="No Image Available"
              style={{
                width: "27%",
                height: "27%",
                margin: "3% 3% 3%",
                borderRadius: "15px 50px 30px 5px",
                position: "relative",
                left: "67%",
                zIndex: "2",
              }}
            />
            <div style={feedbigheadingstyle}>FEED</div>
            <div style={feedtextstyle}>
              Tip your favorites and see them rise
              <br />
              Discover the most popular and highly-rated images
              <br />
              Be a part of a vibrant community of photography enthusiasts
            </div>
            <div
              className="position-absolute top-0 start-0"
              style={{
                height: "100%",
                width: "50%",
                backgroundColor: "#F5C6EC",
                borderRadius: "0 0 100% 0",
                zIndex: "1",
              }}
            ></div>
          </button>
        </h2>

        {/* AFTER CLICK SHOWUP OF CHECKFEED SECTION */}
        <div
          id="flush-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">

          { props.images.map((image, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>
                        <p>{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkfeed;
