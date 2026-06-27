"use client";

import { motion } from "framer-motion";
import { Trophy, Shield, Calendar, Globe } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const activities = [
  {
    title: "NCSA x CISCO CTF 2026",
    role: "Active Participant",
    organization: "NCSA & Cisco Thailand",
    date: "2026",
    skills: ["Network Reconnaissance (nmap, dig)", "Directory Fuzzing (dirb, gobuster)", "Web Vulnerability Assessment (SQL Injection)"],
    keyActivities: [
      "Conducted infrastructure discovery and network enumeration to map active services and DNS configurations.",
      "Executed automated directory fuzzing to identify hidden paths and exposed web assets.",
      "Analyzed database structures and authentication mechanisms through targeted SQL injection assessment inside lab environments (DVWA)."
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const techLinks: Record<string, string> = {
  "nmap": "https://nmap.org/",
  "dig": "https://en.wikipedia.org/wiki/Dig_(command)",
  "dirb": "https://www.kali.org/tools/dirb/",
  "gobuster": "https://github.com/OJ/gobuster",
  "SQL Injection": "https://owasp.org/www-community/attacks/SQL_Injection",
  "DVWA": "https://github.com/digininja/DVWA",
  "DNS": "https://en.wikipedia.org/wiki/Domain_Name_System",
  "CTF": "https://en.wikipedia.org/wiki/Capture_the_flag#Computer_security",
  "Cisco": "https://www.cisco.com/"
};

const sortedTechKeys = Object.keys(techLinks).sort((a, b) => b.length - a.length);

function highlightTech(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedKey = "";

    for (const key of sortedTechKeys) {
      let startIdx = 0;
      while (true) {
        const idx = remaining.indexOf(key, startIdx);
        if (idx === -1) break;

        const hasAlphanumericBefore = idx > 0 && /^[a-zA-Z0-9]$/.test(remaining[idx - 1]);
        const hasAlphanumericAfter = (idx + key.length) < remaining.length && /^[a-zA-Z0-9]$/.test(remaining[idx + key.length]);

        if (!hasAlphanumericBefore && !hasAlphanumericAfter) {
          if (idx < earliestIndex) {
            earliestIndex = idx;
            matchedKey = key;
          }
          break;
        }
        
        startIdx = idx + 1;
      }
    }

    if (matchedKey) {
      if (earliestIndex > 0) {
        parts.push(remaining.substring(0, earliestIndex));
      }
      parts.push(
        <a
          key={`tech-${keyIndex++}`}
          href={techLinks[matchedKey]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:font-bold transition-all"
        >
          {matchedKey}
        </a>
      );
      remaining = remaining.substring(earliestIndex + matchedKey.length);
    } else {
      parts.push(remaining);
      remaining = "";
    }
  }

  return parts;
}

export default function Competitions() {
  return (
    <section id="competitions" className="pt-0 pb-0 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Competitions & Activities
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-slate-300 dark:border-slate-700 pt-10 divide-y divide-slate-300 dark:divide-slate-700 space-y-12"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.title}
              variants={itemVariants}
              className="transition-all pt-12 first:pt-0"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {activity.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>{activity.date}</span>
                </div>
              </div>

              {/* Sub-Header Metadata */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {activity.role}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  {activity.organization}
                </span>
              </div>

              {/* Technical Skills Covered */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                  Technical Skills Covered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activity.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-800"
                    >
                      {highlightTech(skill)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Activities */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Key Activities
                </h4>
                {activity.keyActivities.map((action, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {highlightTech(action)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
