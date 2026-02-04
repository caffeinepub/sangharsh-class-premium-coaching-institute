import { useEffect } from 'react';
import HomePage from './pages/HomePage';
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

  return (
    <AppErrorBoundary>
      <HomePage />
    </AppErrorBoundary>
  );
}

export default App;
