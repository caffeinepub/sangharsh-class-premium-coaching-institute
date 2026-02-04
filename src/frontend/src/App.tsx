import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import AppErrorBoundary from './components/AppErrorBoundary';
import { initRuntimeDiagnostics, logRenderStart } from './utils/runtimeDiagnostics';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize diagnostics on mount
    initRuntimeDiagnostics();
    logRenderStart('App');
  }, []);

  return (
    <AppErrorBoundary>
      <HomePage />
    </AppErrorBoundary>
  );
}

export default App;
