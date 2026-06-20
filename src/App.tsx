import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import DarzFusion from './components/DarzFusion';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    
    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setCurrentPath('/admin');
      } else if (window.location.hash === '#/darzfusion') {
        setCurrentPath('/darzfusion');
      } else if (window.location.hash === '') {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    // Initial check for hash
    if (window.location.hash === '#/admin') {
      setCurrentPath('/admin');
    } else if (window.location.hash === '#/darzfusion') {
      setCurrentPath('/darzfusion');
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = (path: string) => {
    if (path === '/admin') {
      window.location.hash = '#/admin';
    } else if (path === '/darzfusion') {
      window.location.hash = '#/darzfusion';
    } else {
      window.location.hash = '';
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  if (currentPath === '/darzfusion') {
    return (
      <ThemeProvider>
        <DarzFusion onBackToPortfolio={() => navigate('/')} />
      </ThemeProvider>
    );
  }

  if (currentPath === '/admin') {
    return (
      <ThemeProvider>
        {token ? (
          <AdminDashboard 
            token={token} 
            onLogout={handleLogout} 
            onBackToPortfolio={() => navigate('/')} 
          />
        ) : (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess} 
            onBackToPortfolio={() => navigate('/')} 
          />
        )}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="font-poppins bg-white dark:bg-dark-bg text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
