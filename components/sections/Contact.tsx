"use client"

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ContactInfo {
  firstName: string;
  email: string;
  message: string;
}

const initContactInfo: ContactInfo = {
  firstName: "",
  email: "",
  message: "",
};

const Contact: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initContactInfo);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedContactInfo: ContactInfo = { ...contactInfo, [e.target.name]: e.target.value };
    // const updatedContactInfo = { ...contactInfo };
    // updatedContactInfo[e.target.name] = e.target.value;
    setContactInfo(updatedContactInfo);
  };

  const onSubmitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("££££££££££££3", contactInfo)
    try {
      setLoading(true);
      await axios.post("/api/contact", contactInfo)
      toast.success('Message sent.');
      router.refresh();
    } catch(error) {
      toast.error("Form submission failed.")
    } finally {
      setLoading(false);
      setContactInfo(initContactInfo)
    }
  };

  return (
    // Contact section start
    <section className="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 m-auto">
            <div className="sec-heading">
              <h3 className="sec-title">Get In Touch</h3>
              <p>
                To doesn&apos;t his appear replenish together called he of mad place
                won&apos;t wherein blessed second every wherein were meat kind
                wherein and martcin
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 col-md-12 m-auto">
            <div className="row">
              <div className="col-md-4">
                <address>
                  <span className="ti-map-alt"></span>
                  848 E 28th ST, BROOKLYN <br />
                  NEW YORK, USa
                </address>
                <address>
                  <span className="ti-email"></span>
                  <a href="mailto:example@leospa.com">example@leospa.com</a>
                  <a href="mailto:example@leospa.com">example@leospa.com</a>
                </address>
                <address>
                  <span className="ti-tablet"></span>
                  <a href="tel:+0236523653265(02)">
                    tel:+02 365 2365 3265 (02)
                  </a>
                  <a href="tel:+0136523653265(04)">+01 365 2365 3265 (04)</a>
                </address>
              </div>
              <div className="col-md-7 offset-md-1">
                <form className="contact-form" onSubmit={onSubmitHandler}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={inputChangeHandler}
                    value={contactInfo.firstName}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={inputChangeHandler}
                    value={contactInfo.email}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Write Comment"
                    onChange={inputChangeHandler}
                    value={contactInfo.message}
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-round">
                    Submit now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // Contact section end
  );
};

export default Contact;
