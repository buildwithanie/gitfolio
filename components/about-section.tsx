"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Code, Lightbulb } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-emerald-50/70 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 bg-white dark:bg-gray-800 text-emerald-600 hover:bg-white dark:hover:bg-gray-800 border-emerald-200 dark:border-emerald-800"
          >
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
            Who I Am
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <Card className="border-none shadow-md bg-white dark:bg-gray-800 h-full">
              <div className="h-1.5 bg-emerald-500"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Background</h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    I&apos;m Ann Githinji, a passionate developer with a Bachelor&apos;s degree in Information
                    Technology. My journey in tech has equipped me with a diverse skill set spanning both web and mobile
                    development.
                  </p>
                  <p>
                    I specialize in creating responsive web applications and intuitive mobile experiences, with a focus
                    on clean code and modern design principles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg shrink-0">
                <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Education</h3>
                <p className="text-gray-600 dark:text-gray-300">Bachelor&apos;s Degree in Information Technology</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg shrink-0">
                <Code className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">My Approach</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I believe in creating digital solutions that are not only functional but also aesthetically pleasing
                  and user-friendly. My goal is to bridge the gap between technical requirements and exceptional user
                  experiences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg shrink-0">
                <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">What I Do</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I develop responsive websites, dynamic web applications, and native Android applications that deliver
                  seamless experiences across all devices.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
