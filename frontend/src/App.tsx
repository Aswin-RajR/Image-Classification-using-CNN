import React, { useEffect, useState } from 'react'
import { LoadingScreen } from './components/LoadingScreen'
import MainPage from './components/MainPage'

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="app">
      <MainPage />
    </div>
  )
}

