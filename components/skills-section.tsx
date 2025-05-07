"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Smartphone, Globe, Layers, GitBranch } from "lucide-react"

export function SkillsSection() {
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks",
      technologies: ["Next.js", "React", "TypeScript", "HTML/CSS", "Tailwind CSS"],
    },
    {
      icon: <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Backend & Databases",
      description: "Building robust server-side applications and database structures",
      technologies: ["Supabase", "Firebase", "SQL", "RESTful APIs"],
    },
    {
      icon: <Smartphone className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Mobile Development",
      description: "Developing native Android applications with modern tooling",
      technologies: ["Kotlin", "Android SDK", "Jetpack Compose"],
    },
    {
      icon: <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Web Technologies",
      description: "Implementing modern web standards and practices",
      technologies: ["Progressive Web Apps", "Responsive Design", "Web APIs"],
    },
    {
      icon: <Layers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "UI/UX Design",
      description: "Creating intuitive and aesthetically pleasing user experiences",
      technologies: ["Figma", "Design Systems", "Animation", "Framer Motion"],
    },
    {
      icon: <GitBranch className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Tools & Workflow",
      description: "Utilizing modern development tools and practices",
      technologies: ["Git", "GitHub", "CI/CD", "Agile Methodologies"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 border-emerald-200 dark:border-emerald-800"
          >
            My Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded mb-6"></div>
          <p className="max-w-[700px] text-gray-600 dark:text-gray-300">
            I&apos;ve developed a diverse skill set across multiple technologies and platforms, allowing me to build
            comprehensive solutions from concept to deployment.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 h-full flex flex-col">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skill.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
