import { useRef, useEffect, useState } from 'react'
import './VideoPlayer.css'

function VideoPlayer({ video, isActive }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(console.error)
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isActive])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const videoUrl = video.video_url

  return (
    <div className="video-player-container">
      <video
        ref={videoRef}
        src={videoUrl}
        className="video-player"
        loop
        muted={false}
        playsInline
        onClick={togglePlay}
      />
      <div className="video-overlay">
        <div className="video-info">
          <div className="video-author">
            <div className="author-avatar">
              {video.author_name ? video.author_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="author-name">{video.author_name || 'Unknown'}</span>
          </div>
          <p className="video-description">{video.description || ''}</p>
        </div>
        <div className="video-actions">
          <div className="action-button">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{video.likes || 0}</span>
          </div>
          <div className="action-button">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
            </svg>
            <span>{video.comments || 0}</span>
          </div>
          <div className="action-button">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </div>
        </div>
      </div>
      {!isPlaying && (
        <div className="play-button-overlay" onClick={togglePlay}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer

