import React from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Features from './Features';
import ContactForm from './ContactForm';
import CreateMeeting from './CreateMeeting';



const HomePage = () => {
    return (
        <div>
            
            <Hero />
            <Features />
            <CreateMeeting />
            <ContactForm />
            
            <Footer />
            


            {/* Other components and sections */}
        </div>
    );
};

export default HomePage;