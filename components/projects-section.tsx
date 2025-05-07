"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Play, ExternalLink } from "lucide-react"
import Image from "next/image"
import { VideoDemoModal } from "@/components/video-demo-modal"

export function ProjectsSection() {
  const [activeVideo, setActiveVideo] = useState<{
    isOpen: boolean
    title: string
    videoSrc: string
  }>({
    isOpen: false,
    title: "",
    videoSrc: "",
  })

  const openVideoDemo = (title: string, videoSrc: string) => {
    setActiveVideo({
      isOpen: true,
      title,
      videoSrc,
    })
  }

  const closeVideoDemo = () => {
    setActiveVideo({
      ...activeVideo,
      isOpen: false,
    })
  }

  const projects = [
    {
      title: "HyperCare Assistance",
      description:
        "A mobile chatbot application that provides information and education about hypertension, helping users learn about high blood pressure management.",
      image: "/hypercare-chatbot.jpg",
      videoSrc: "/videos/hypercare-demo.mp4",
      tags: ["Android", "Kotlin", "AI Chatbot", "Healthcare"],
      githubLink: "#",
    },
    {
      title: "HealthyHeart Web App",
      description:
        "A web application that helps users understand hypertension, monitor blood pressure readings, and learn effective management strategies.",
      image: "/healthyheart-webapp.jpg",
      videoSrc: "/videos/healthyheart-demo.mp4",
      liveUrl: "https://hyperwebcare.vercel.app/",
      tags: ["Next.js", "Javascript", "Tailwind CSS", "Healthcare"],
      githubLink: "#",
    },
    {
      title: "University Management System",
      description:
        "A student management system for University of Embu with course registration and student authentication features.",
      image: "/university-system.jpg",
      videoSrc: "/videos/university-demo.mp4",
      liveUrl: "",
      tags: ["PHP", "Hack", "MySql", "Education"],
      githubLink: "#",
    },
    {
      title: "FarmConnect",
      description:
        "An Android application that helps farmers connect directly with buyers, eliminating middlemen and enabling direct import of produce to increase farmer profits.",
      image: "/farmconnect-app.jpg",
      videoSrc: "/videos/farmconnect-demo.mp4",
      liveUrl: "",
      tags: ["Android", "Kotlin", "Firebase", "Agriculture"],
      githubLink: "#",
    },
    {
      title: "FarmConnect Buyer View",
      description:
        "An Android application that now show different kind of produce posted by different farmers to the buyers.",
      image: "/buyer.jpg",
      videoSrc: "/videos/buyer.mp4",
      liveUrl: "",
      tags: ["Android", "Kotlin", "Firebase", "Agriculture"],
      githubLink: "#",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <>
      <section id="projects" className="py-16 bg-emerald-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 hover:bg-white dark:hover:bg-gray-800 border-emerald-200 dark:border-emerald-800"
            >
              My Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-emerald-500 rounded mb-6"></div>
            <p className="max-w-[700px] text-gray-600 dark:text-gray-300">
              Here are some of my recent projects that showcase my skills and expertise in web and mobile development.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={item} className="h-full">
                <Card className="overflow-hidden border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-emerald-100 dark:hover:shadow-emerald-900/10 transition-all duration-300 h-full">
                  <div className="flex flex-col h-full">
                    {/* Main content - image and description side by side */}
                    <div className="flex flex-col md:flex-row flex-grow">
                      {/* Image container */}
                      <div className="relative md:w-1/2 h-[300px]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="h-full w-full"
                        >
                          <Image
                            src={project.image || "/placeholder.svg?height=300&width=400"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </div>

                      {/* Description section */}
                      <div className="md:w-1/2 p-6 flex flex-col">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags section at bottom */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 mt-auto border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Buttons positioned below tags */}
                      <div className="flex gap-3 justify-start">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          asChild
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>

                        {project.liveUrl ? (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => openVideoDemo(project.title, project.videoSrc)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Demo Modal */}
      {activeVideo.isOpen && (
        <VideoDemoModal
          isOpen={activeVideo.isOpen}
          onClose={closeVideoDemo}
          title={activeVideo.title}
          videoSrc={activeVideo.videoSrc}
        />
      )}
    </>
  )
}
