import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AppErrorBoundary from './components/AppErrorBoundary';
import { initRuntimeDiagnostics, logRenderStart } from './utils/runtimeDiagnostics';
import { initializeSeoGuards } from './utils/seoGuards';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize diagnostics on mount
    initRuntimeDiagnostics();
    logRenderStart('App');
    
    // Initialize SEO guards to handle canonical URLs and noindex on non-canonical domains
    initializeSeoGuards();
  }, []);

  // Simple pathname-based routing
  const pathname = window.location.pathname;
  const isAboutPage = pathname === '/about' || pathname === '/about/';

  return (
    <AppErrorBoundary>
      {isAboutPage ? <AboutPage /> : <HomePage />}
    </AppErrorBoundary>
  );
}

export default App;
