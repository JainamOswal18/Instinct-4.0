import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '@/pages/Auth'
import Landing from '@/pages/Landing'
import { ResidentDashboard, AuthorityDashboard } from '@/pages/Dashboards'
import Account from '@/pages/Account'
import Settings from '@/pages/Settings'
import Plans from '@/pages/Plans'
import Analytics from '@/pages/Analytics'

function App() {
  const [user, setUser] = useState<{ role: string } | null>(null)

  // Hydrate user from localStorage on mount (mock persistence)
  useEffect(() => {
    const stored = localStorage.getItem('energy_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogin = (role: string) => {
    const newUser = { role }
    setUser(newUser)
    localStorage.setItem('energy_user', JSON.stringify(newUser))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('energy_user')
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page for non-authenticated users */}
        <Route path="/" element={
          user ? (
            user.role === 'Resident' ? <ResidentDashboard onLogout={handleLogout} /> :
              user.role === 'Authority' ? <AuthorityDashboard onLogout={handleLogout} /> :
                <Navigate to="/auth" replace />
          ) : (
            <Landing />
          )
        } />

        <Route path="/auth" element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/" replace />} />

        {/* Resident-only routes */}
        <Route path="/account" element={
          user && user.role === 'Resident' ? <Account onLogout={handleLogout} /> : <Navigate to="/auth" replace />
        } />
        <Route path="/settings" element={
          user && user.role === 'Resident' ? <Settings onLogout={handleLogout} /> : <Navigate to="/auth" replace />
        } />
        <Route path="/plans" element={
          user && user.role === 'Resident' ? <Plans onLogout={handleLogout} /> : <Navigate to="/auth" replace />
        } />
        <Route path="/analytics" element={
          user && user.role === 'Resident' ? <Analytics onLogout={handleLogout} /> : <Navigate to="/auth" replace />
        } />

        {/* Catch all redirect to root which handles auth check */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
