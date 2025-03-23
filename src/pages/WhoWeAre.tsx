
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WhoWeAre = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Who We Are</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-sm text-justify">
          <p className="mb-4">
          <strong>CanteenCraze</strong> was founded in 2025 with a simple mission: to reduce waiting times for students in college cafeterias and provide hassle-free food ordering.
          </p>
          
          <p className="mb-4">
          We are a team of <strong>two passionate students</strong> who combined our tech skills and campus experiences to build a platform that lets you pre-order meals, compare prices, and skip the queues.
          </p>
          
          <p className="mb-4">
          We believe students’ time is precious and should be spent learning, connecting, and growing, not standing in line. That’s why we designed <strong>CanteenCraze</strong> to make campus dining effortless. With features like <strong>real-time order tracking</strong>, <strong>price comparisons</strong>, <strong>dish reviews</strong>, and <strong>estimated wait times</strong>, we empower students to make smarter choices and reclaim their time.
          </p>
          <hr className="my-4" />

          <h2 className="text-xl font-semibold mt-6 mb-4">Our Values</h2>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Efficiency First</strong> - We aim to minimize waiting times so students can focus on what matters.</li>
            <li><strong>Convenience</strong> - Our platform ensures a smooth and hassle-free ordering experience.</li>
            <li><strong>Student-Centric Design</strong> - Every feature is built around the real needs of students.</li>
            <li><strong>Transparency</strong> - With price comparisons and real-time wait times, students always know what to expect.</li>
            <li><strong>Community Support</strong> - We collaborate with campus canteens to boost their reach while keeping student budgets in mind.</li>
            <li><strong>Innovation</strong> - We continuously improve our platform based on student feedback and emerging technologies.</li>
          </ul>

          <hr className="my-4" />

          <h2 className="text-xl font-semibold mt-6 mb-4">Why We Do It</h2>

          <p className="mb-4">
          As students ourselves, we’ve felt the frustration of missing lectures or study sessions just to grab a meal. <strong>CanteenCraze</strong> isn’t just an app it’s our way of making campus life smoother, one order at a time.
          </p>
          <p className="mb-4">
          <strong>Join us</strong> in transforming how students eat, one click at a time. 🚀
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WhoWeAre;
