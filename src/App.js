import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Features from './pages/Features';
import GithubIntegration from './pages/GithubIntegration';
import ContactForm from './pages/ContactForm';
import About from './pages/About';
import Room from './pages/Room'
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/room/:meetingId" element={<Room />} />
            <Route path="/githubintegration" element={<GithubIntegration />} />
          </Routes>
        </main>
        <footer className="bg-black text-green-500 p-4 text-center">
          © 2023 GenZ Connect. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;