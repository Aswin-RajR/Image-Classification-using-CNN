import React from 'react'
import Logo from '/src/assets/logo.svg'

export const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-root" role="status" aria-live="polite">
      <div className="loading-card">
        <img src={Logo} className="logo" alt="AR Logo" />
        <div className="brand">AR</div>
        <div className="tag">IDEAS INTO INTELLIGENCE</div>
        <div className="spinner" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

