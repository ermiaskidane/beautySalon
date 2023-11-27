"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

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
  phone: ' ',
  appointmentDate: '',
  appointmentTime: '',
  notes: ' ',
}

const AppointmentForm: React.FC = (props: any) => {
  const { onFormSubmit } = props
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initFormData)
  const router = useRouter();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newFormData: FormData = {...formData, [e.target.name]: e.target.value }
    // const newFormData = { ...formData }
    // newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  const getAvailableHours = (date: string) => {
    // Assuming that the time input has options in 30-minute intervals
    const allHours = Array.from({ length: 24 * 2 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute = index % 2 === 0 ? "00" : "30";
      return `${hour.toString().padStart(2, '0')}:${minute}`;
    });

    // console.log("@@@@@@@@@", date)
    // console.log("sdfadfsdf", allHours)
  
    // Filter out the hours from 00:00 to 10:00
    const availableHours = allHours.filter((hour) => {
      const selectedTime = new Date(`${date}T${hour}:00`);
      const isUnavailable = selectedTime.getHours() < 10 || selectedTime.getHours() >= 17;
      return !isUnavailable;
    });
  
    return availableHours;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("£££££££££££££££", formData)
    // onFormSubmit(formData)
    try {
      setLoading(true);
      await axios.post("/api/appointment", formData)
      toast.success('Comment Created.');
      router.refresh();
    }catch(error) {
      toast.error("Form submission failed.")
    } finally {
      setLoading(false);
      setFormData(initFormData)
    }
    // axios
    //   .post("/appointments.json", formData)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       toast.success("Appointment created successfully!");
    //     } else {
    //       throw new Error("Form submission failed.");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   });
    // setFormData(initFormData)
  }

  // console.log(formData)

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
            defaultValue='s1'
            onChange={inputChangeHandler}
          >
            <option value='s1'>Select service</option>
            <option value='s2'>Select service 1</option>
          </select>
        </div>
        <input
          name='phone'
          type='tel'
          value={formData.phone}
          onChange={inputChangeHandler}
          placeholder='Phone numer'
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
          {getAvailableHours(formData.appointmentDate).map((hour) => (
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
      <button type='submit' className='btn btn-round'>
        Make an Appointment
      </button>
    </form>
  )
}

export default AppointmentForm
