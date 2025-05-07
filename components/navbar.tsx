"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // Handle smooth scrolling
    const targetId = href === "#" ? "top" : href.substring(1)
    const element = targetId === "top" ? document.body : document.getElementById(targetId)

    if (element) {
      // Adjust scroll offset based on viewport width
      const offset = window.innerWidth < 768 ? 60 : 80
      window.scrollTo({
        top: targetId === "top" ? 0 : element.offsetTop - offset,
        behavior: "smooth",
      })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Prevent hydration mismatch by not rendering theme toggle until mounted
  const renderThemeToggle = () => {
    if (!mounted) return null

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="ml-2 text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-[18px] w-[18px] md:h-5 md:w-5" />
        ) : (
          <Moon className="h-[18px] w-[18px] md:h-5 md:w-5" />
        )}
      </Button>
    )
  }

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-emerald-200 dark:bg-emerald-600 shadow-sm py-2 md:py-3"
          : "bg-emerald-200 dark:bg-emerald-600 py-3 md:py-5"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between h-12 md:h-auto">
          <Link
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-300"
          >
            Ann<span className="text-gray-900 dark:text-white">Githinji</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2 text-sm lg:text-base text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors rounded-md"
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            {renderThemeToggle()}

            <Button className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm lg:text-base">
              <Link href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                Hire Me
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center md:hidden">
            {renderThemeToggle()}

            <button
              className="p-1 ml-1 text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden bg-emerald-200 dark:bg-emerald-600 shadow-sm overflow-hidden"
          >
            <div className="container px-4 py-3 mx-auto">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-4 py-2 text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors rounded-md"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="w-full text-center">
                    Hire Me
                  </Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
