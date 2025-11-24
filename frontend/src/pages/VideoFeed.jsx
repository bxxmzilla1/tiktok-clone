import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import VideoPlayer from '../components/VideoPlayer'
import './VideoFeed.css'

function VideoFeed() {
  const [videos, setVideos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setVideos(data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setLoading(false)
    }
  }

  const handleScroll = (e) => {
    const container = containerRef.current
    if (!container) return

    const scrollTop = container.scrollTop
    const itemHeight = window.innerHeight
    const newIndex = Math.round(scrollTop / itemHeight)

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentIndex(newIndex)
    }
  }

  if (loading) {
    return (
      <div className="video-feed-loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="video-feed-empty">
        <p>No videos yet</p>
        <a href="/admin" className="admin-link">Go to Admin to upload videos</a>
      </div>
    )
  }

  return (
    <div className="video-feed-container" ref={containerRef} onScroll={handleScroll}>
      {videos.map((video, index) => (
        <VideoPlayer
          key={video.id}
          video={video}
          isActive={index === currentIndex}
        />
      ))}
    </div>
  )
}

export default VideoFeed

