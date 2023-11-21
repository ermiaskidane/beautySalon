import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

const Banner = () => {
  return (
    // Banner section start
    <section className="banner">
      <div className="spa-img">
      <img src="/images/spa.png" alt="" />
        {/* <img src={require("../assets/images/spa.png")} alt="" /> */}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="banner-content">
              <span>spa & beauty center</span>
              <h2>Beauty and success starts here.</h2>
              <p>
                Together creeping heaven upon third dominion be upon won't
                darkness rule behold it created good saw after she'd Our set
                living.
              </p>
              <a href="#appointment_sec" className="btn">
                reserve now
              </a>
              <a
                className="video-btn"
                target="_blank"
                data-fancybox
                href="https://www.youtube.com/watch?v=QWUPm0ND7HY"
              >
                {/* <Play className="ti-control-play" /> */}
                <i className="ti-control-play"></i>
                Watch our story
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    // Banner section end
  );
};

export default Banner;
