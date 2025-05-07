"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, CheckCircle, AlertCircle, Loader2, FileText, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ChangeEvent, FormEvent } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: false, message: "" })

    try {
      // Create FormData object
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("message", formData.message)

      // Send the form data to our API route
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: "Message sent successfully! I'll get back to you soon.",
        })
        // Reset form
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error(result.message || "Something went wrong")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus({
        loading: false,
        success: false,
        error: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again or contact directly via email.",
      })
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
          <Badge
            variant="outline"
            className="mb-3 md:mb-4 bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 border-emerald-200 dark:border-emerald-800"
          >
            Get In Touch
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-3 md:mb-4 text-gray-900 dark:text-white">
            Contact Me
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-emerald-500 rounded mb-4 sm:mb-6"></div>
          <p className="max-w-[700px] text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2">
            Have a project in mind or want to discuss potential opportunities? I&apos;d love to hear from you. Reach out
            using the form below or through my contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Card className="border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg h-full">
              <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  Send Me a Message
                </h3>

                {status.success && (
                  <Alert className="mb-4 sm:mb-6 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription className="text-xs sm:text-sm">{status.message}</AlertDescription>
                  </Alert>
                )}

                {status.error && (
                  <Alert className="mb-4 sm:mb-6 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription className="text-xs sm:text-sm">{status.message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base h-9 sm:h-10"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base h-9 sm:h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      className="min-h-[100px] sm:min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      disabled={status.loading}
                      className="px-4 sm:px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base h-9 sm:h-10"
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
              <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Feel free to reach out directly. I&apos;m always open to discussing new projects, creative ideas, or
                    opportunities.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 sm:p-2 rounded-full">
                        <Mail className="h-4 w-2 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <a
                        href="mailto:buildwithanie@gmail.com"
                        className="text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate"
                      >
                        buildwithanie@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 sm:p-2 rounded-full">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200">Nairobi, Kenya</span>
                    </div>

                    {/* CV Download */}
                    <div className="flex items-center space-x-3 pt-2">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 sm:p-2 rounded-full">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
                          Download My CV
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Get a copy of my resume</span>
                      </div>
                    </div>
                    <div className="pl-10">
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                        onClick={() => window.open("/cv.pdf", "_blank")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download CV
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
