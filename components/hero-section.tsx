"use client"

import { motion } from "framer-motion"
import { Code, Layers, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Geist } from "next/font/google"

// Using Geist font for a modern, clean look
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${geist.variable}`}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Main content - Centered */}
      <div className="container relative z-10 px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
          >
            <span className="relative flex h-4 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Hey there! I&apos;m a Web & Mobile Creator
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="font-geist text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ann <span className="text-emerald-500 dark:text-emerald-400">Githinji</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Bringing digital concepts to life through thoughtful web and Android development, where technical innovation meets human-centered design.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-8 sm:mt-10">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-base sm:text-lg px-8 py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-200/50 dark:hover:shadow-emerald-900/30"
            >
              <Link href="#projects" className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Explore my Portfolio
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-base sm:text-lg px-8 py-6 rounded-xl transition-all duration-300"
            >
              <Link href="#contact" className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Let&apos;s Chat!
              </Link>
            </Button>
          </motion.div>

          {/* Tech stack */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-10 max-w-2xl mx-auto">
            {[
              { name: "Next.js", icon: <Code className="h-4 w-4" /> },
              { name: "TypeScript", icon: <Code className="h-4 w-4" /> },
              { name: "Kotlin", icon: <Code className="h-4 w-4" /> },
              { name: "Supabase", icon: <Code className="h-4 w-4" /> },
              { name: "Firebase", icon: <Code className="h-4 w-4" /> },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-2"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech.icon}
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1.8,
          },
        }}
      >
        <Link
          href="#about"
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
        </Link>
      </motion.div>
    </section>
  )
}
