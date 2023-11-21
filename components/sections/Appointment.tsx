// import axios from "../axios-orders";
import React from "react";
import toast from "react-hot-toast";
import AppointmentForm from "../AppointmentForm";

const Appointment = () => {
  // const handleFormSubmit = (data) => {
  //   // axios
  //   //   .post("/appointments.json", data)
  //   //   .then((res) => {
  //   //     if (res.status === 200) {
  //   //       toast.success("Appointment created successfully!");
  //   //     } else {
  //   //       throw new Error("Form submission failed.");
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     toast.error(err.message);
  //   //   });
  // };

  return (
    // Appointment section start
    <section className="appointment" id="appointment_sec">
      <div className="appointment-wrap">
        <figure>
          <img src="/images/appointment-img.jpg" alt="" />
        </figure>
        <div className="appointment-form">
        <AppointmentForm  /> 
          {/* <AppointmentForm onFormSubmit={handleFormSubmit} /> */}
        </div>
      </div>
    </section>
    // Appointment section end
  );
};

export default Appointment;
