import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import './Admin.css'

function Admin() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [authorName, setAuthorName] = useState('')
  const [description, setDescription] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [message, setMessage] = useState('')

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile)
      setMessage('')
    } else {
      setMessage('Please select a valid video file')
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a video file')
      return
    }

    if (!authorName.trim()) {
      setMessage('Please enter an author name')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setMessage('')

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `videos/${fileName}`

      // Upload video to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath)

      // Insert video record into database
      const { error: dbError } = await supabase
        .from('videos')
        .insert([
          {
            video_url: urlData.publicUrl,
            author_name: authorName,
            description: description,
            likes: 0,
            comments: 0
          }
        ])

      if (dbError) throw dbError

      setMessage('Video uploaded successfully!')
      setFile(null)
      setAuthorName('')
      setDescription('')
      setUploadProgress(0)
      
      // Reset file input
      const fileInput = document.getElementById('video-file')
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Error uploading video:', error)
      setMessage(`Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin - Upload Video</h1>
          {user && <p className="user-email">Logged in as: {user.email}</p>}
        </div>
        <div className="header-actions">
          <a href="/" className="back-link">← Back to Feed</a>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="upload-form">
          <div className="form-group">
            <label htmlFor="video-file">Select Video File</label>
            <input
              id="video-file"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {file && (
              <div className="file-info">
                <p>Selected: {file.name}</p>
                <p>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="author-name">Author Name</label>
            <input
              id="author-name"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter author name"
              disabled={uploading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description (optional)"
              rows="4"
              disabled={uploading}
            />
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="upload-button"
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Admin

