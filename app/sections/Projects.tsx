"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Github, Network, Bot, Wind, Play, X, Activity } from "lucide-react";
const projects = [
  {
    title: "HQ-Branch Network Topology Design",
    description:
      "Designed and configured a dual-site network (HQ + Branch) spanning 12 departments and 13 VLANs across simulated Layer 2 and Layer 3 .",
    icon: Network,
    achievements: [
      "Configured OSPF Area 0 on routers and Layer 3 switches with route summarization, reducing routing table size and improving convergence.",
      "Implemented a site-to-site IPSec VPN tunnel (AES-256, DH Group 5) over serial links between HQ and Branch routers, validating secure communication and traffic encapsulation.",
      "Deployed Inter-VLAN routing via SVIs on dual multilayer switches (3560) with DHCP relay (ip helper-address) forwarding requests to a centralized server.",
      "Configured PAT (NAT Overload) with dual ISP failover) to ensure internet connectivity redundancy."
    ],
    githubUrl: "https://github.com/ToonSupakit/HQ-Branch-Network-Topology-Design",
    videoUrl: "/videos/cild-cisco.mp4",
  },
  {
    title: "Network Monitoring & Automation System",
    description:
      "Developed a network monitoring and automated remediation system containerized with Docker for GNS3 labs. The system collects interface metrics via SNMP, uses an Isolation Forest model to detect traffic anomalies, and provides a Flask and Socket.IO web interface for real-time alerts and Netmiko-based Cisco CLI commands.",
    icon: Activity,
    achievements: [
      "Machine Learning Anomaly Detection: Combines standard threshold checks with an Isolation Forest model to identify interface issues in a GNS3 lab topology.",
      "Scheduled Model Retraining: Uses a Python script to periodically retrain the Isolation Forest model using historical database metrics.",
      "Port Remediation & Rate Limiting: Executes automated or manual port bounces (shutdown/no shutdown) and rate limits on Cisco routers and switches using Netmiko.",
      "Config Backup & Diff Engine: Saves running configurations and features a Git-like comparison tool to view config changes over time.",
      "Real-time Dashboard: Built a Flask-based interface with Socket.IO to display device metrics and syslog state changes as they occur.",
      "Dockerized Deployment: Configured a Docker Compose setup inside a VMware Ubuntu VM to handle database persistence",
    ],
    tools: [
      "Programming: Python, JavaScript, HTML5, CSS3",
      "Machine Learning: Scikit-learn (Isolation Forest)",
      "Network & Automation: Netmiko, SNMP",
      "Web & Database: Flask (Flask-SocketIO), MySQL",
      "Environments: Docker, Docker Compose, Ubuntu Linux, VMware Workstation"
    ],
    githubUrl: "https://github.com/ToonSupakit/NetSentinelAI-Network",
    videoUrl: "/videos/clip-ai-network.mp4",
    imageUrl: "/diagram-network-ai3.png",
  },
  {
    title: "Smart Air & Automated System",
    description:
      "Automated Fan Control: Automatically turns on the 5V DC ventilation fans (simulating room ventilation) when pollution exceeds the threshold and turns them off when air quality returns to normal, controlled via a Relay Module.",
    icon: Wind,
    achievements: [
      "Air Pollution Monitoring: Measures PM2.5, CO2, flammable gas/smoke, temperature, and humidity from multiple sensors simultaneously",
      "Real-time Update: Sensor data is pushed to the Web Dashboard via WebSocket (Socket.IO) without page refresh",
      "Automated Fan Control: Automatically turns on the 5V DC ventilation fans when pollution exceeds the threshold and turns it off when air quality returns to normal, controlled via Relay Module",
      "Data Logging & History: Continuously records sensor data to MySQL and displays PM2.5 history charts via Chart.js",
      "Smart Alerts: Shows on-screen alerts when PM2.5 reaches hazardous levels, with alert history logging"
    ],
    tools: [
      "Microcontroller: ESP32",
      "Firmware: C++ (Arduino IDE)",
      "Backend server: Node.js, Express.js",
      "Real-time communication: Socket.IO",
      "Database: MySQL",
      "Frontend: HTML5, CSS3, JavaScript",
      "Charting: Chart.js",
      "Dust sensor: PMS5003 (Serial/UART)",
      "Temperature & humidity sensor: AHT10 (I2C)",
      "Air quality sensor: ENS160 (I2C) — measures CO2, eCO2, TVOC",
      "Gas/Smoke sensor: MQ-2 (Analog)"
    ],
    githubUrl: "https://github.com/ToonSupakit/iot-project",
    videoUrl: "/videos/iot.mp4",
    imageUrl: "/architecture-iot2.png",
  },
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

// Tech keyword → URL mapping for inline highlighting
const techLinks: Record<string, string> = {
  "OSPF": "https://en.wikipedia.org/wiki/Open_Shortest_Path_First",
  "IPSec VPN": "https://en.wikipedia.org/wiki/IPsec",
  "IPSec": "https://en.wikipedia.org/wiki/IPsec",
  "VLAN": "https://en.wikipedia.org/wiki/Virtual_LAN",
  "Inter-VLAN": "https://en.wikipedia.org/wiki/Virtual_LAN",
  "DHCP relay": "https://en.wikipedia.org/wiki/DHCP_helper_address",
  "DHCP": "https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol",
  "NAT Overload": "https://en.wikipedia.org/wiki/Network_address_translation",
  "NAT": "https://en.wikipedia.org/wiki/Network_address_translation",
  "PAT": "https://en.wikipedia.org/wiki/Network_address_translation",
  "Layer 3": "https://en.wikipedia.org/wiki/Layer_3_switch",
  "Cisco IOS": "https://www.cisco.com/c/en/us/products/ios-nx-os-software/index.html",
  "Cisco": "https://www.cisco.com/",
  "Isolation Forest": "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html",
  "Scikit-learn": "https://scikit-learn.org/",
  "Python": "https://www.python.org/",
  "Flask": "https://flask.palletsprojects.com/",
  "Flask-SocketIO": "https://flask-socketio.readthedocs.io/",
  "Socket.IO": "https://socket.io/",
  "WebSocket": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  "Netmiko": "https://github.com/ktbyers/netmiko",
  "SNMP": "https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol",
  "PySNMP": "https://pysnmp.readthedocs.io/",
  "MySQL": "https://www.mysql.com/",
  "SQLite": "https://www.sqlite.org/",
  "SQLAlchemy": "https://www.sqlalchemy.org/",
  "Discord.py": "https://discordpy.readthedocs.io/",
  "Discord API": "https://discord.com/developers/docs/intro",
  "Discord": "https://discord.com/",
  "GitHub Actions": "https://github.com/features/actions",
  "GNS3": "https://www.gns3.com/",
  "Pytest": "https://docs.pytest.org/",
  "pytest": "https://docs.pytest.org/",
  "Arista": "https://www.arista.com/",
  "MikroTik": "https://mikrotik.com/",
  "Juniper": "https://www.juniper.net/",
  "ESP32": "https://www.espressif.com/en/products/socs/esp32",
  "Arduino IDE": "https://www.arduino.cc/en/software",
  "Arduino": "https://www.arduino.cc/",
  "C++": "https://en.cppreference.com/",
  "Node.js": "https://nodejs.org/",
  "Express.js": "https://expressjs.com/",
  "Express": "https://expressjs.com/",
  "Chart.js": "https://www.chartjs.org/",
  "HTML5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "PMS5003": "https://www.adafruit.com/product/3686",
  "AHT10": "https://learn.adafruit.com/adafruit-aht20",
  "ENS160": "https://www.sciosense.com/products/environmental-sensors/ens160-digital-metal-oxide-multi-gas-sensor/",
  "MQ-2": "https://www.sparkfun.com/products/9405",
  "Relay Module": "https://en.wikipedia.org/wiki/Relay",
  "AES-256": "https://en.wikipedia.org/wiki/Advanced_Encryption_Standard",
  "CSRF": "https://en.wikipedia.org/wiki/Cross-site_request_forgery",
  "Ruff": "https://docs.astral.sh/ruff/",
  "Black": "https://black.readthedocs.io/",
  "PM2.5": "https://en.wikipedia.org/wiki/Particulates",
  "CO2": "https://en.wikipedia.org/wiki/Carbon_dioxide",
  "AQI": "https://en.wikipedia.org/wiki/Air_quality_index",
  "US EPA": "https://www.epa.gov/",
  "SSE": "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events",
  "Docker Compose": "https://docs.docker.com/compose/",
  "Docker": "https://www.docker.com/",
  "VMware Workstation": "https://www.vmware.com/products/workstation-pro.html",
  "VMware": "https://www.vmware.com/",
  "Ubuntu Linux": "https://ubuntu.com/",
  "Ubuntu": "https://ubuntu.com/",
  "syslog": "https://en.wikipedia.org/wiki/Syslog",
  "Git": "https://git-scm.com/",
};

// Sort keywords by length (longest first) to avoid partial matches
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

        // Check boundary: characters before and after matched key must not be alphanumeric
        const hasAlphanumericBefore = idx > 0 && /^[a-zA-Z0-9]$/.test(remaining[idx - 1]);
        const hasAlphanumericAfter = (idx + key.length) < remaining.length && /^[a-zA-Z0-9]$/.test(remaining[idx + key.length]);

        if (!hasAlphanumericBefore && !hasAlphanumericAfter) {
          if (idx < earliestIndex) {
            earliestIndex = idx;
            matchedKey = key;
          }
          break; // Found the earliest occurrence of this key
        }
        
        startIdx = idx + 1;
      }
    }

    if (matchedKey) {
      // Add text before the match
      if (earliestIndex > 0) {
        parts.push(remaining.substring(0, earliestIndex));
      }
      // Add the linked keyword
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

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState<string>("");

  return (
    <section id="projects" className="pt-0 pb-0">
      <div>
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Featured Projects
          </h2>
          
        </AnimatedSection>
 
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-slate-300 dark:border-slate-700 pt-10 divide-y divide-slate-300 dark:divide-slate-700 space-y-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="transition-all pt-12 first:pt-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-x-2 text-sm text-slate-400 dark:text-slate-500">
                  {project.videoUrl && (
                    <button
                      onClick={() => {
                        setActiveVideo(project.videoUrl);
                        setVideoTitle(project.title);
                      }}
                      className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:font-bold transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Demo</span>
                    </button>
                  )}
                  {project.videoUrl && project.githubUrl && (
                    <span>|</span>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:font-bold transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
 
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {project.description}
              </p>
 
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Key Features</h4>
                {project.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {highlightTech(achievement)}
                    </p>
                  </div>
                ))}
              </div>

              {project.tools && project.tools.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Tools / Technologies</h4>
                  {project.tools.map((tool, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {highlightTech(tool)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {project.imageUrl && (
                <div 
                  onClick={() => {
                    setActiveImage(project.imageUrl);
                    setImageTitle(project.title);
                  }}
                  className="mt-5 overflow-hidden rounded-xl border border-slate-200/60 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm max-w-full cursor-zoom-in hover:opacity-90 hover:border-blue-400/45 dark:hover:border-blue-500/35 transition-all duration-200"
                >
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} Architecture`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                  Demo: {videoTitle}
                </h3>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[70vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal Overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                  {imageTitle} - Architecture Diagram
                </h3>
                <button
                  onClick={() => setActiveImage(null)}
                  className="p-1 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Container */}
              <div className="bg-slate-950 flex items-center justify-center p-2 max-h-[80vh] overflow-auto">
                <img
                  src={activeImage}
                  alt={`${imageTitle} Architecture`}
                  className="max-w-full h-auto max-h-[75vh] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
