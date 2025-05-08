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
      const offset = window.innerWidth < 768 ? 60 : 40
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
        className="ml-1 text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300 h-7 w-7"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
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
          ? "bg-emerald-200 dark:bg-emerald-600 shadow-sm py-1"
          : "bg-emerald-200 dark:bg-emerald-600 py-1.5 md:py-2"
      }`}
    >
      <div className="container px-3 md:px-4 mx-auto">
        <div className="flex items-center justify-between h-8 md:h-10">
          <Link
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="text-lg md:text-xl font-bold text-emerald-800 dark:text-emerald-300"
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
                className="px-2 py-1 text-sm text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors rounded-md"
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            {renderThemeToggle()}

            <Button className="ml-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm h-7 px-2.5">
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
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
            <div className="container px-3 py-2 mx-auto">
              <nav className="flex flex-col space-y-0.5">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-3 py-1.5 text-sm text-gray-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors rounded-md"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-sm">
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