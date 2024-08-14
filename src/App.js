import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Features from './pages/Features';
import ContactForm from './pages/ContactForm';
import About from './pages/About';
import Room from './pages/Room';
import GithubIntegration from './pages/GithubIntegration';
import RepoDetails from './pages/RepoDetails';

const App = () => {
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
            <Route path="/github" element={<GithubIntegration />} />
            <Route path="/repo/:username/:repoName" element={<RepoDetails />} />
            {/* Redirect from /githubintegration to /github */}
            <Route path="/githubintegration" element={<Navigate to="/github" />} />
          </Routes>
        </main>
        <footer className="bg-black text-green-500 p-4 text-center">
          © {new Date().getFullYear()} GenZ Connect. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;