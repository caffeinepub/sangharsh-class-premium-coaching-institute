// Runtime diagnostics for production debugging
let diagnosticsEnabled = false;

export function enableDiagnostics(enabled: boolean) {
  diagnosticsEnabled = enabled;
}

export function initRuntimeDiagnostics() {
  if (!diagnosticsEnabled) return;

  // Catch unhandled errors
  window.addEventListener('error', (event) => {
    console.error('[Diagnostics] Uncaught error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Diagnostics] Unhandled promise rejection:', {
      reason: event.reason,
      promise: event.promise
    });
  });
}

export function logRenderStart(componentName: string) {
  if (!diagnosticsEnabled) return;
  console.log(`[Diagnostics] Rendering ${componentName}`);
}
