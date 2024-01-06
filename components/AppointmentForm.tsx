"use client";

import { Appointment } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface AppointmentFormProps {
  bookedAppointment: Appointment[]
}
interface FormData {
  name: string,
  email: string,
  service: string,
  phone: string,
  appointmentDate: string,
  appointmentTime: string,
  notes: string,
}

const initFormData: FormData = {
  name: '',
  email: '',
  service: '',
  phone: '',
  appointmentDate: '',
  appointmentTime: '',
  notes: '',
}

const AppointmentForm = ({bookedAppointment}: AppointmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initFormData)
  const router = useRouter();

  // console.log("££££££££££££££££££EEEEEEEEEEEEEDDDDDDDDDDDDD",bookedAppointment)

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newFormData: FormData = {...formData, [e.target.name]: e.target.value }
    // const newFormData = { ...formData }
    // newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  const getAvailableHours = (
    date: string,
    bookedAppointment: Appointment[]
  ): string[]=> {
    const currentDate = new Date();
    const selectedDate = new Date(date);
  
    // Check if the selected date is the current day
    const isCurrentDay = (
      currentDate.getFullYear() === selectedDate.getFullYear() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getDate() === selectedDate.getDate()
    );
  
    // Assuming that the time input has options in 30-minute intervals
    const allHours = Array.from({ length: 24 * 2 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute = index % 2 === 0 ? "00" : "30";
      return `${hour.toString().padStart(2, '0')}:${minute}`;
    });
  
    // Filter out the hours from 00:00 to 10:00 and the past hours if the date is the current day
    const availableHours = allHours.filter((hour) => {
      const selectedTime = new Date(`${date}T${hour}:00`);
      const isUnavailable = (
        selectedTime.getHours() < 10 ||
        (isCurrentDay && selectedTime <= currentDate) || selectedTime.getHours() >= 17
      );
      return !isUnavailable;
    });
  
    // return availableHours;

    // // Filter out the hours that are already booked
    // const bookedTimes = bookedAppointment
    //   .filter((appointment) => appointment.appointmentDate === date)
    //   .map((appointment) => appointment.appointmentTime);

    // const availableHoursFiltered = availableHours.filter((hour) => !bookedTimes.includes(hour));

    // return availableHoursFiltered;

    // Check the total number of booked appointments for each specific hour on the given date
    const bookedAppointmentsForDate = bookedAppointment.filter((appointment) => appointment.appointmentDate === date);
    const bookedAppointmentsByHour: { [hour: string]: number } = {};
    
    bookedAppointmentsForDate.forEach((appointment) => {
      const { appointmentTime } = appointment;
      bookedAppointmentsByHour[appointmentTime] = (bookedAppointmentsByHour[appointmentTime] || 0) + 1;
    });

    // Make the entire day and time unavailable if two or more appointments are booked for a specific hour
    const availableHoursFiltered = availableHours.filter((hour) => {
      const appointmentCountForHour = bookedAppointmentsByHour[hour] || 0;
      return appointmentCountForHour < 3;
    });

    return availableHoursFiltered;

  };


  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

//   const fullNumber = '2034399002125581';
// const last4Digits = fullNumber.slice(-4);
// const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

  const getMaxDate = () => {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    return `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1).toString().padStart(2, '0')}-${maxDate.getDate().toString().padStart(2, '0')}`;
  };
  

  const handleFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("£££££££££££££££", formData)
    // onFormSubmit(formData)
    try {
      setLoading(true);
      await axios.post("/api/appointment", formData)
      toast.success('appointment created.');
      router.refresh();
    }catch(error) {
      toast.error("Form submission failed.")
    } finally {
      setLoading(false);
      setFormData(initFormData)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-field half-width'>
        <input
          name='name'
          type='text'
          value={formData.name}
          onChange={inputChangeHandler}
          placeholder='NAME'
          required
        />
        <input
          name='email'
          type='email'
          value={formData.email}
          onChange={inputChangeHandler}
          placeholder='Email address'
          required
        />
      </div>
      <div className='form-field half-width'>
        <div className='select-field'>
          <select
            name='service'
            defaultValue=''
            onChange={inputChangeHandler}
          >
            <option value=''>Select service</option>
            <option value='s1'>service 1</option>
            <option value='s2'>service 2</option>
            <option value='s3'>service 3</option>
          </select>
        </div>
        <input
          name='phone'
          type='tel'
          value={formData.phone}
          onChange={inputChangeHandler}
          placeholder="Phone number"
          required
        />
      </div>
      <div className='form-field half-width'>
        <input
          name='appointmentDate'
          type='date'
          value={formData.appointmentDate}
          onChange={inputChangeHandler}
          placeholder='date'
          min={getCurrentDate()}
          max={getMaxDate()} 
          required

        />
        {/* <input
          name='appointmentTime'
          type='time'
          value={formData.appointmentTime}
          onChange={inputChangeHandler}
          placeholder='time'
        /> */}

        <select
          name='appointmentTime'
          value={formData.appointmentTime}
          onChange={inputChangeHandler}
          required
        >
          <option value=''>Select time</option>
          {getAvailableHours(formData.appointmentDate, bookedAppointment).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <div className='form-field'>
        <textarea
          name='notes'
          placeholder='Your notes'
          value={formData.notes}
          onChange={inputChangeHandler}
        ></textarea>
      </div>
      <button type='submit' className={`${loading? "opacity-30": ""} btn btn-round`}>
        Make an Appointment
      </button>
    </form>
  )
}

export default AppointmentForm
