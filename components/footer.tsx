"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp,  Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-emerald-50 dark:bg-emerald-950/30 border-t border-emerald-100 dark:border-emerald-900/50">
      <div className="container py-8 px-4">
        {/* Main content - compact centered design */}
        <div className="max-w-3xl mx-auto text-center">
          

          <p className="text-emerald-800/80 dark:text-emerald-300/80 mb-4 text-sm max-w-xl mx-auto font-sans">
            A passionate web and Android developer focused on creating elegant, user-friendly applications with modern
            technologies.
          </p>

          {/* Social media icons - compact row */}
        

          {/* Quick links - compact horizontal layout */}
          <div className="mb-5">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item} className="inline-block">
                  <Link
                    href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                    className="text-sm text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section - compact footer */}
        <div className="max-w-3xl mx-auto border-t border-emerald-200/50 dark:border-emerald-800/30 pt-4 mt-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs text-emerald-700/70 dark:text-emerald-400/70">
            <p>© {currentYear} Ann Githinji. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <p className="flex items-center">
              Made with <Heart className="h-3 w-3 text-rose-500 mx-1" /> using Next.js & Tailwind
            </p>
            <span className="hidden sm:inline">•</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 rounded-full text-xs px-3 py-0 bg-emerald-100/80 dark:bg-emerald-800/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-3 w-3 mr-1" />
              Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
