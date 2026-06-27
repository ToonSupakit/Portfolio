"use client";

import { motion } from "framer-motion";


export default function Sidebar() {
  return (
    <aside className="lg:fixed lg:w-[320px] xl:w-[360px] lg:top-24 space-y-4">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-4"
      >
      {/* Profile Image */}
      <div className="relative mx-auto sm:mx-0 w-fit">
        <div className="w-40 h-40 sm:w-44 sm:h-44 xl:w-48 xl:h-48 rounded-full shadow-2xl ring-8 ring-slate-200 dark:ring-slate-700 overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img
            src="/profile.jpg"
            alt="Supakit Chusing"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl -z-10" />
      </div>

    
      <div className="text-center sm:text-left space-y-3">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 py-3">
          Supakit Chusing
        </h1>
        
        
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm pr-12">
          I am a final-year Computer Engineering student focusing on networking, security, and automation. 
          I love designing, configuring, and automating network topologies within simulated environments to solve routing, security, and connectivity challenges. 
          I’m passionate about learning new technologies and am currently seeking a Network Engineering internship to apply my skills to real-world challenges. :)
        </p>
        {/* Contact Links */}
        <div className="text-center sm:text-left pt-4 space-y-2">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-2 text-sm text-slate-400 dark:text-slate-500">
            <a 
              href="/resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:font-bold transition-all"
            >
              Resume
            </a>
            <span>|</span>
            <a 
              href="https://www.linkedin.com/in/supakit1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:font-bold transition-all"
            >
              LinkedIn
            </a>
            <span>|</span>
            <a 
              href="https://github.com/ToonSupakit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:font-bold transition-all"
            >
              GitHub
            </a>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <span>email - </span>
            <a 
              href="mailto:toonmeraipao44@gmail.com"
              className="hover:text-slate-800 dark:hover:text-slate-200 hover:font-bold transition-all"
            >
              toonmeraipao44@gmail.com
            </a>
          </div>
        </div>
      </div>
      </motion.div>
    </aside>
  );
}
