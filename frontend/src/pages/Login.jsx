import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        setError('Check your email to confirm your account!')
      } else {
        await signIn(email, password)
        navigate('/admin')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>TikTok Clone</h1>
          <p>{isSignUp ? 'Create an account' : 'Sign in to continue'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && (
            <div className={`error-message ${error.includes('Check your email') ? 'success' : ''}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="toggle-button"
            disabled={loading}
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="back-to-feed">
          <a href="/">← Back to Video Feed</a>
        </div>
      </div>
    </div>
  )
}

export default Login

