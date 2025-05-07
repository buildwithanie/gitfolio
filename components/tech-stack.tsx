"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Code, 
  Box, 
  FileJson, 
  Flame, 
  Database, 
  Terminal, 
  Paintbrush, 
  Smartphone 
} from "lucide-react"

export function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  // Tech stack data with Lucide icons
  const technologies = [
    {
      name: "Next.js",
      icon: <Code className="h-6 w-6" />,
      color: "#000000",
      position: { x: 0, y: -180 },
    },
    {
      name: "React",
      icon: <Box className="h-6 w-6" />,
      color: "#61DAFB",
      position: { x: 180, y: 0 },
    },
    {
      name: "TypeScript",
      icon: <FileJson className="h-6 w-6" />,
      color: "#3178C6",
      position: { x: 127, y: -127 },
    },
    {
      name: "Firebase",
      icon: <Flame className="h-6 w-6" />,
      color: "#FFCA28",
      position: { x: 0, y: 180 },
    },
    {
      name: "Supabase",
      icon: <Database className="h-6 w-6" />,
      color: "#3ECF8E",
      position: { x: -180, y: 0 },
    },
    {
      name: "Kotlin",
      icon: <Terminal className="h-6 w-6" />,
      color: "#7F52FF",
      position: { x: -127, y: 127 },
    },
    {
      name: "Tailwind CSS",
      icon: <Paintbrush className="h-6 w-6" />,
      color: "#38B2AC",
      position: { x: 127, y: 127 },
    },
    {
      name: "Android",
      icon: <Smartphone className="h-6 w-6" />,
      color: "#3DDC84",
      position: { x: -127, y: -127 },
    },
  ]

  return (
    <div className="relative w-[400px] h-[400px]">
      {/* Central element */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-700 rounded-full shadow-lg flex items-center justify-center z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <div className="w-28 h-28 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Ann G.
          </span>
        </div>
      </motion.div>

      {/* Connection lines */}
      <svg className="absolute top-0 left-0 w-full h-full z-10">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1, delay: 0.5 }}>
          {technologies.map((tech) => (
            <motion.line
              key={tech.name}
              x1="200"
              y1="200"
              x2={200 + tech.position.x}
              y2={200 + tech.position.y}
              stroke={tech.color}
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          ))}
        </motion.g>
      </svg>

      {/* Tech icons */}
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute flex flex-col items-center"
          style={{
            top: `calc(50% + ${tech.position.y}px - 30px)`,
            left: `calc(50% + ${tech.position.x}px - 30px)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 + index * 0.1 }}
          whileHover={{ scale: 1.2, zIndex: 30 }}
          onHoverStart={() => setHoveredTech(tech.name)}
          onHoverEnd={() => setHoveredTech(null)}
        >
          <div
            className={`w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center relative ${
              hoveredTech === tech.name ? "ring-2 ring-emerald-500 ring-offset-2" : ""
            }`}
            style={{ color: tech.color }}
          >
            {tech.icon}

            {/* Tooltip */}
            {hoveredTech === tech.name && (
              <motion.div
                className="absolute -bottom-10 whitespace-nowrap bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 rounded-md shadow-lg text-sm font-medium z-30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tech.name}
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Background glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-400/10 dark:bg-emerald-600/10 blur-xl z-0"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}