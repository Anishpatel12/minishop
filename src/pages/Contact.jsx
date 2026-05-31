// src/pages/Contact.jsx

import { useState } from "react";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import toast from "react-hot-toast";

export default function Contact() {
  // FORM STATE
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // FUTURE BACKEND API
    console.log(formData);

    toast.success(
      "Message Sent Successfully"
    );

    // RESET
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO */}
      <section className="relative h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Contact"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            Contact Us
          </h1>

          <p className="text-xl max-w-3xl leading-9 text-gray-200">
            We'd love to hear from you.
            Reach out for support,
            feedback, or business
            inquiries.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT */}
          <div>
            {/* TITLE */}
            <h2 className="text-5xl font-bold mb-8">
              Get In Touch
            </h2>

            <p className="text-gray-600 text-lg leading-9 mb-12">
              Have questions about products,
              orders, or partnerships? Our
              team is always ready to help
              you with the best shopping
              experience.
            </p>

            {/* CONTACT CARDS */}
            <div className="space-y-8">
              {/* EMAIL */}
              <div className="bg-white rounded-[30px] p-8 shadow-xl flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl">
                  <FaEnvelope />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Email Us
                  </h3>

                  <p className="text-gray-500 text-lg">
                    support@ministore.com
                  </p>

                  <p className="text-gray-500 text-lg">
                    business@ministore.com
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="bg-white rounded-[30px] p-8 shadow-xl flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl">
                  <FaPhoneAlt />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Call Us
                  </h3>

                  <p className="text-gray-500 text-lg">
                    +91 9876543210
                  </p>

                  <p className="text-gray-500 text-lg">
                    +91 8765432109
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="bg-white rounded-[30px] p-8 shadow-xl flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Visit Office
                  </h3>

                  <p className="text-gray-500 text-lg leading-8">
                    221B Business Street,
                    Tech City, India
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="bg-white rounded-[30px] p-8 shadow-xl flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl">
                  <FaClock />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Working Hours
                  </h3>

                  <p className="text-gray-500 text-lg">
                    Monday - Saturday
                  </p>

                  <p className="text-gray-500 text-lg">
                    9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="mt-12">
              <h3 className="text-3xl font-bold mb-6">
                Follow Us
              </h3>

              <div className="flex gap-5">
                <button className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl flex items-center justify-center hover:scale-110 transition">
                  <FaFacebookF />
                </button>

                <button className="w-16 h-16 rounded-full bg-pink-500 text-white text-2xl flex items-center justify-center hover:scale-110 transition">
                  <FaInstagram />
                </button>

                <button className="w-16 h-16 rounded-full bg-sky-500 text-white text-2xl flex items-center justify-center hover:scale-110 transition">
                  <FaTwitter />
                </button>

                <button className="w-16 h-16 rounded-full bg-blue-800 text-white text-2xl flex items-center justify-center hover:scale-110 transition">
                  <FaLinkedinIn />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            {/* TITLE */}
            <h2 className="text-4xl font-bold mb-10">
              Send Message
            </h2>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* NAME */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={
                    formData.message
                  }
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 transition resize-none"
                ></textarea>
              </div>

              {/* BUTTON */}
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-semibold hover:bg-blue-700 transition shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[40px] overflow-hidden shadow-2xl">
            <iframe
              title="Map"
              src="https://maps.google.com/maps?q=india&t=&z=5&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[500px]"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}