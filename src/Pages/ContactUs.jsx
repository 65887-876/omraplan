import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactImage from '../assets/Contact.png'; // Adjust the import path as necessary
import { LuHouse } from "react-icons/lu";
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(formData);
  };

  const sendEmail = (formData) => {
    const serviceID = 'service_b4t44xk';
    const templateID = 'template_x26cub6';
    const userID = 'HFjh8lvAPwKnoJSqI';

    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitted(true);
        toast.success('Thank you for contacting us!');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        toast.error('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="flex justify-center items-end h-[664px] bg-gradient-to-r from-yellow-100 sm:from-yellow-200 via-yellow-50 to-yellow-50 px-4 md:px-0">
      <div className="flex flex-col md:flex-row">
        {/* Left Section with Image */}
        <div className="hidden md:flex flex-col justify-end w-1/2 mr-2">
          <img src={ContactImage} alt="Contact" className="w-full h-auto object-cover" />
        </div>

        {/* Right Section with Form */}
        <div className="flex flex-col justify-start w-full md:w-[651px] h-[591px]">
          <div className="flex flex-row items-center p-0 w-full md:w-[146px] h-[24px] mb-6 cursor-pointer">
            <div className="flex flex-row items-center">
              <span className='text-primary-4 mr-[2px]'><LuHouse /></span>
              <Link to="/" className="text-primary-4 font-plus-jakarta mr-[6px]">Accueil</Link>
              <span className="text-secondary-6 font-plus-jakarta">/</span>
              <Link to="/contact" className="text-secondary-6 font-plus-jakarta ml-[6px]">Contact</Link>
            </div>
          </div>

          <h2 className="text-[32px] text-neutral-13 font-bold font-plus-jakarta w-[80%]">Laissez-nous un message !</h2>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[14px] text-neutral-13 pt-4 font-bold font-plus-jakarta">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Entrer votre nom"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[14px] text-neutral-13 font-bold font-plus-jakarta">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@mail.com"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[14px] text-neutral-13 font-bold font-plus-jakarta">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                className="w-full h-[153px] p-2 border border-gray-300 rounded-lg"
                required
                maxLength="400"
              />
            </div>

            <button
              type="submit"
              className="bg-primary-6 px-4 text-white p-2 rounded-lg hover:bg-primary-5 w-full"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;