// src/pages/About.jsx

import {
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaAward,
  FaUsers,
  FaStore,
  FaGlobe,
  FaStar,
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",

      description:
        "Lightning fast shipping with real-time tracking and secure packaging.",
    },

    {
      icon: <FaLock />,
      title: "Secure Payments",

      description:
        "100% secure payment gateway with encrypted transactions.",
    },

    {
      icon: <FaHeadset />,
      title: "24/7 Support",

      description:
        "Dedicated customer support available anytime for assistance.",
    },

    {
      icon: <FaAward />,
      title: "Premium Quality",

      description:
        "Top quality products from trusted global brands.",
    },
  ];

  const stats = [
    {
      icon: <FaUsers />,

      value: "50K+",

      title: "Happy Customers",
    },

    {
      icon: <FaStore />,

      value: "10K+",

      title: "Products",
    },

    {
      icon: <FaGlobe />,

      value: "25+",

      title: "Countries",
    },

    {
      icon: <FaStar />,

      value: "4.9",

      title: "Ratings",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",

      role: "Founder & CEO",

      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    {
      name: "Sophia Williams",

      role: "Marketing Head",

      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },

    {
      name: "David Miller",

      role: "Tech Lead",

      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },

    {
      name: "Emma Brown",

      role: "Customer Manager",

      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546"
          alt="About"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            About MiniStore
          </h1>

          <p className="text-xl max-w-3xl leading-9 text-gray-200">
            We are building the future of
            online shopping with premium
            products, fast delivery, and
            exceptional customer experience.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
              alt="Story"
              className="rounded-[40px] shadow-2xl"
            />
          </div>

          {/* CONTENT */}
          <div>
            <p className="text-blue-600 font-bold text-lg mb-4 uppercase tracking-widest">
              Our Story
            </p>

            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Bringing Premium Shopping
              Experience Worldwide
            </h2>

            <p className="text-gray-600 leading-9 text-lg mb-6">
              MiniStore started with a vision
              to make premium shopping
              accessible for everyone.
              Today, we deliver thousands of
              products globally with secure
              transactions and world-class
              service.
            </p>

            <p className="text-gray-600 leading-9 text-lg">
              Our mission is to combine
              innovation, trust, and customer
              satisfaction into one seamless
              shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Why Choose Us
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We provide a premium shopping
              experience with quality,
              security, and customer
              satisfaction at the center.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(
              (feature, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-[35px] p-10 text-center hover:-translate-y-3 transition duration-300 shadow-xl"
                >
                  {/* ICON */}
                  <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl mx-auto mb-8">
                    {feature.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold mb-5">
                    {feature.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-gray-500 leading-8">
                    {
                      feature.description
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map(
              (stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  {/* ICON */}
                  <div className="text-5xl mb-6 flex justify-center">
                    {stat.icon}
                  </div>

                  {/* VALUE */}
                  <h2 className="text-6xl font-bold mb-4">
                    {stat.value}
                  </h2>

                  {/* TITLE */}
                  <p className="text-xl text-gray-200">
                    {stat.title}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Meet Our Team
            </h2>

            <p className="text-gray-500 text-lg">
              The passionate people behind
              MiniStore.
            </p>
          </div>

          {/* TEAM GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map(
              (member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[35px] overflow-hidden shadow-2xl hover:-translate-y-3 transition duration-300"
                >
                  {/* IMAGE */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[350px] object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">
                      {member.name}
                    </h3>

                    <p className="text-blue-600 font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Ready To Explore?
          </h2>

          <p className="text-gray-500 text-lg leading-8 mb-10">
            Start shopping now and discover
            premium products with the best
            online shopping experience.
          </p>

          <a
            href="/products"
            className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl"
          >
            Explore Products
          </a>
        </div>
      </section>
    </div>
  );
}