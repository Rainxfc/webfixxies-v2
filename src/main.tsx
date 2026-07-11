import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {error: string | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message + '\n' + error.stack };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#08080c',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 32, fontFamily: 'monospace',
        }}>
          <div style={{ color: '#ef4444', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            ⚠ Runtime Error
          </div>
          <pre style={{
            color: '#f0eeff', fontSize: 12, lineHeight: 1.6,
            maxWidth: 800, overflowX: 'auto', whiteSpace: 'pre-wrap',
            background: '#111116', padding: 24, borderRadius: 12,
            border: '1px solid rgba(239,68,68,0.3)',
          }}>
            {this.state.error}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
