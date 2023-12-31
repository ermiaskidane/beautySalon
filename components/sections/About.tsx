import React from "react";
import Link from "next/link";

interface AboutSecProps {
  btn: boolean
}

const AboutSec = ({btn} : AboutSecProps) => {
  return (
    // About section start
    <section className="about">
      <img
        src="/images/china-rose.png"
        alt=""
        className="flower-1"
      />
      <img
        src="/images/jasmine.png"
        alt=""
        className="flower-2"
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-12 m-auto">
            <div className="sec-heading">
              <img src="/images/butterfly.png" alt="" />
              <span className="tagline">About our spa center</span>
              <h3 className="sec-title">Come and you will be Inspired!</h3>
              <p>
                It’s the end of summer the sweltering heat makes human sweat in
                the night and makes the plants and trees wilt even in the
                moonlit nights. The eastern wind breeze brings an eerie feeling,
                that the monsoon clouds are soon coming, there is a strange
                silence in the ears, the sky gets darker and darker
              </p>
            </div>
            {btn && (
              <Link href="/about" className="btn btn-round">
                Read more
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
    // About section end
  );
};

export default AboutSec;
