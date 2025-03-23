import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-sm text-justify">
            <p className="mb-4">
            At <strong>CanteenCraze</strong>, we’re on a mission to transform campus dining by turning chaotic queues into quick, stress-free meals. Our platform empowers students to pre-order food, compare prices, and make informed choices, all while saving precious time.
            </p>
          
          <hr className="my-4" />

          <h2 className="text-xl font-semibold mt-6 mb-4">Our Story</h2>
          
          <p className="mb-4">
          <strong>It all started with a cold sandwich and a 30-minute wait.</strong>
          </p>
          <p className="mb-4">
          <strong>That 30-minute wait cost them more than a meal—it cost them study time.</strong>
          </p>
            <p className="mb-4">
            Over a rushed coffee later, Faizan grumbled, “<em>Why can’t we just order ahead?</em>” Nausheen paused, then grinned: “<em>Why not?</em>”
            </p>
          <p className="mb-4">
          That week, they skipped their usual coding projects and turned their dorm room into a startup hub. They mapped out campus canteens, interviewed 50+ students about their biggest cafeteria frustrations (“<em>Prices vary everywhere!</em>”, “<em>I never know what’s good!</em>”), and coded a bare-bones app during late-night sessions fueled by instant noodles.
          </p>
          
          <p className="mb-4">
            Since our launch, we've grown from serving just a few neighborhoods to becoming a comprehensive dining guide available in multiple cities. We've helped countless diners discover new favorite spots and assisted restaurants in connecting with enthusiastic customers.
          </p>

          <hr className="my-4" />
          
          <h2 className="text-xl font-semibold mt-6 mb-4">The Team</h2>
          
          <p className="mb-4">
            We’re a small but mighty team of students-turned-founders who’ve lived the chaos we’re solving. From coding all-nighters to negotiating with canteen owners, we’ve built CanteenCraze with grit, caffeine, and a shared belief that no student should choose between food and time.
          </p>
          
          <p className="mb-4">
          Meet the faces behind the app:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Faizan Hassan</strong> (Founder) - Tech wizard who can debug code faster than you can say "burger."</li>
            <li><strong>Nausheen Parween</strong> (Co-Founder) - Campus foodie who knows every canteen’s secret menu.</li>
          </ul>

          <hr className="my-4" />
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Our Vision</h2>
          
          <p className="mb-4">
          We’re not just building an app—we’re redefining campus life. By <strong>2030</strong>, we aim to partner with <strong>100+ colleges</strong>, reduce student wait times by <strong>70%</strong>, and become the go-to platform for hassle-free campus dining.
          </p>
          
          <hr className="my-4" />
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Join the Movement</h2>
          
          <p className="mb-4">
          Whether you’re a student, canteen owner, or fellow innovator, help us make campus dining better.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Students</strong>: Download the app and #SkipTheQueue.</li>
            <li><strong>Canteens</strong>: Partner with us to grow your reach</li>
            <li><strong>Builders</strong>: Check our GitHub for open-source tools.</li>
          </ul>

          {/* <p className="mb-4">
          </p> 
          <hr className="my-4" />
          <strong></strong>
          */}

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
