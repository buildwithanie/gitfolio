"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

interface VideoDemoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  videoSrc: string
}

export function VideoDemoModal({ isOpen, onClose, title, videoSrc }: VideoDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset video state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false)
      setProgress(0)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
      }
    }
  }, [isOpen])

  // Update progress bar
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      const value = (video.currentTime / video.duration) * 100
      setProgress(isNaN(value) ? 0 : value)
    }

    video.addEventListener("timeupdate", updateProgress)
    return () => video.removeEventListener("timeupdate", updateProgress)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setProgress(0)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width

    videoRef.current.currentTime = pos * videoRef.current.duration
    setProgress(pos * 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-black">
        <DialogHeader className="p-4 bg-gray-900">
          <DialogTitle className="text-white">{title} - Live Demo</DialogTitle>
        </DialogHeader>
        <div ref={containerRef} className="relative w-full aspect-video bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            onEnded={handleVideoEnd}
            playsInline
          />

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-700 rounded-full mb-2 cursor-pointer" onClick={handleProgressClick}>
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
