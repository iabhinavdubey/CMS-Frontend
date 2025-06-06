import React from 'react';
import logo from "/src/assets/logo.png";
import MediaUploader from '../MediaUplaoder';

const Landing = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 via-white to-indigo-50 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Empowering Education Through Technology
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Rafiki enables seamless Education Solutions, Assesment, and Technology solutions tailored for emerging markets.
            </p>
            {/* <button className="mt-6 px-6 py-3 bg-gray-600 hover:bg-[#F47515] cursor-pointer text-white rounded-full shadow-md transition duration-300">
              Get Started
                      </button> */}
                      
                      <button
  onClick={() => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  }}
  className="mt-6 px-6 py-3 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white rounded-full shadow-md transition duration-300"
>
  Get Started
</button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={logo} 
              alt="Rafiki Logo"
              className="w-3/4 max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </section>

     {/* Services Section */}
      <section id="services" className="py-8 bg-gray-50 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">K12 Content Development</h3>
            <p className="text-gray-600">
              We create curriculum-aligned, interactive educational content for grades K-12 across all subjects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">SaaS-Based Solutions</h3>
            <p className="text-gray-600">
              Scalable, cloud-powered platforms for schools, publishers, and institutions to manage learning and teaching at scale.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Assessment Tools</h3>
            <p className="text-gray-600">
              AI-driven formative and summative assessments designed to measure student progress and improve outcomes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">ePub & Digital Publishing</h3>
            <p className="text-gray-600">
              End-to-end design and development of digital textbooks, ePubs, and layout formatting for modern publishing standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Learning Modules</h3>
            <p className="text-gray-600">
              Build engaging, gamified, and interactive learning experiences to keep students motivated and focused.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom EdTech Solutions</h3>
            <p className="text-gray-600">
              From LMS integration to white-label apps, we build custom tools tailored to your institution or business needs.
            </p>
          </div>
        </div>
      </section>

      {/* About / Values Section */}
      <section className="py-16 bg-white px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">Our Core Values</h2>
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start">
            <div className="text-orange-500 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Innovation in Education</h3>
              <p className="text-gray-600 mt-2">
                We're committed to redefining how education is delivered through technology and creativity.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start">
            <div className="text-orange-500 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Inclusive Learning</h3>
              <p className="text-gray-600 mt-2">
                Our mission is to make high-quality educational resources accessible to every learner, everywhere.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start">
            <div className="text-orange-500 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Impactful Outcomes</h3>
              <p className="text-gray-600 mt-2">
                Every solution we build is driven by the goal of improving learning outcomes and empowering educators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Educational Platform?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Partner with Rafiki to bring world-class EdTech solutions to your audience. Let’s shape the future of learning together.
        </p>
        {/* <button className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300">
          Contact Us
        </button> */}
      </section>

    </div>
  );
};

export default Landing;