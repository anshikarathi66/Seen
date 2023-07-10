import React from "react";

export default function Heading() {
  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        backgroundImage:
          "url(https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&w=600)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      {/* <div className="d-block text-white" style={{fontSize: '15vw', fontWeight:'900'}}>
          SEEN
      </div>
      
      <div className="d-block text-white">Your Passport to Social Fun</div> */}
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="text-white d-flex justify-content-center align-items-center" style={{fontSize: '15vw', fontWeight:'900'}}>
              SEEN
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-white d-flex justify-content-center align-items-center" style={{fontSize: '1.5vw', fontWeight:'80', letterSpacing:'1vw'}}>
              Your Passport to Social Fun
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
