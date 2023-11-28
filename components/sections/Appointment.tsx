// import axios from "../axios-orders";
import React from "react";
import toast from "react-hot-toast";
import AppointmentForm from "../AppointmentForm";
import { db } from "@/lib/db";

const Appointment = async() => {

  const getAppointment = await db.appointment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

 const arr = [
    {
      id: '656621604abaf5e1c9ae1d74',
      name: 'test 2',
      email: 'test2@gmail.com',
      service: 's1',
      phone: ' 07281316954',
      appointmentDate: '2023-11-29',
      appointmentTime: '10:00',
      notes: ' test 2 appointment',
      // createdAt: 2023-11-28T17:20:32.148Z
    },
    {
      id: '656621364abaf5e1c9ae1d73',
      name: 'test 1',
      email: 'test1@gamil.com',
      service: 's2',
      phone: ' 073186113233',
      appointmentDate: '2023-11-29',
      appointmentTime: '10:00',
      notes: ' test 1 appointment',
      // createdAt: 2023-11-28T17:19:50.123Z
    },
    {
      id: '6564b220d5a58f11676c635d',
      name: 'karen',
      email: 'karen@test.com',
      service: 's2',
      phone: ' 075634154316',
      appointmentDate: '2023-12-27',
      appointmentTime: '11:30',
      notes: ' test',
      // createdAt: 2023-11-27T15:13:36.792Z
    },
    {
      id: '6564ac9dd5a58f11676c635b',
      name: 'hade',
      email: 'hade@test.com',
      service: 's1',
      phone: ' 078236475414',
      appointmentDate: '2023-11-27',
      appointmentTime: '15:00',
      notes: ' tetsbfjhgbdksh ajgkahgdfs',
      // createdAt: 2023-11-27T14:50:05.172Z
    },
    {
      id: '6564a7e9d5a58f11676c635a',
      name: 'claire',
      email: 'claire@test.com',
      service: 's1',
      phone: ' ',
      appointmentDate: '2023-11-27',
      appointmentTime: '10:00',
      notes: ' dfjasdkfdsfgblhdgdsgasd dfahglyhfdugsad dsflkahsdfdsgfhgfad',
      // createdAt: 2023-11-27T14:30:01.730Z
    },
    {
      id: '6563e9b4611bb392b57f2d3f',
      name: 'david william',
      email: 'sotyu28@gmail.com',
      service: 's2',
      phone: '+447411844906',
      appointmentDate: '2023-12-02',
      appointmentTime: '12:00',
      notes: ' notes',
      // createdAt: 2023-11-27T00:58:28.375Z
    },
    {
      id: '6563e017611bb392b57f2d3e',
      name: 'ermias kidane',
      email: 'sotyu28@gmail.com',
      service: 's2',
      phone: '+447411844906',
      appointmentDate: '2023-11-30',
      appointmentTime: '11:30',
      notes: ' notes dsfkbfajsdfha sdkjasbdkhfasdfs dBKHFGHF DCHSBFS SCBSDHSH dksjfsdfshd dcfkjsdfgsdhgvs dcskgbcskhd',
      // createdAt: 2023-11-27T00:17:27.148Z
    }
  ]

  const appointmentCountMap = arr.reduce((appointmentCounts, { appointmentDate, appointmentTime }) => {
    const key = `${appointmentDate}-${appointmentTime}`;
    appointmentCounts.set(key, (appointmentCounts.get(key) || 0) + 1);
    return appointmentCounts;
  }, new Map());
  
  const duplicates = [...appointmentCountMap.entries()].filter(([key, count]) => count > 1);
  
  console.log('Appointments with the same date and time:');
  console.log(duplicates);
  
  console.log('Count of occurrences for each date and time combination:');
  console.log(Object.fromEntries(appointmentCountMap));
  // console.log(appointmentCountMap);

// #######################################################################
//   // Create a map to store the count of each appointment date and time combination
// const appointmentCountMap2 = new Map();

// // Iterate through the array to count occurrences
// arr.forEach(appointment => {
//   const { appointmentDate, appointmentTime } = appointment;
//   const key = `${appointmentDate}-${appointmentTime}`;

//   // Increment the count for the current combination
//   appointmentCountMap2.set(key, (appointmentCountMap.get(key) || 0) + 1);
// });

// // Filter the combinations with more than one occurrence
// const duplicates2 = Array.from(appointmentCountMap2.entries()).filter(([key, count]) => count > 1);

// // Log the result
// console.log('Appointments with the same date and time:');
// duplicates2
// // Log the count
// console.log('Count of occurrences for each date and time combination:');
// console.log(appointmentCountMap2);
// #######################################################################

  // console.log("LLLLLLLLLLLLLLDDDDDDDD", getAppointment)
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
        <AppointmentForm bookedAppointment={getAppointment} /> 
          {/* <AppointmentForm onFormSubmit={handleFormSubmit} /> */}
        </div>
      </div>
    </section>
    // Appointment section end
  );
};

export default Appointment;
