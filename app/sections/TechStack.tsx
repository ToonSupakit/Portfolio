"use client";

import { AnimatedSection } from "@/components/animated-section";

export default function TechStack() {
  return (
    <section id="skills" className="pt-0 pb-0">
      <div>
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Skills
          </h2>
        </AnimatedSection>

          <ul className="space-y-4 text-slate-500 dark:text-slate-400 list-disc list-outside pl-5 marker:text-black dark:marker:text-white">
            <li>
              <span className="font-bold text-black dark:text-white mr-1">Networking:</span> OSI Model, TCP/IP, IPv4/IPv6, VLSM Subnetting, VLAN,Inter-VLAN Routing, STP, EtherChannel, Port Security, Static Route, Default Route, OSPF, EIGRP, DHCP, NAT/PAT, ACL, VPN, SNMP.
            </li>
            <li>
              <span className="font-bold text-black dark:text-white mr-1">Tools & Technologies:</span> Cisco Packet Tracer, GNS3, Wireshark, PuTTY, TFTP Server.
            </li>
            <li>
              <span className="font-bold text-black dark:text-white mr-1">Programming & Automation:</span> Python, Netmiko, JavaScript, HTML, MySQL.
            </li>
            <li>
              <span className="font-bold text-black dark:text-white mr-1">Familiar:</span> Docker, Linux (Ubuntu)
            </li>
            <li>
              <span className="font-bold text-black dark:text-white mr-1">Languages:</span> Thai (Native), English (Able to read technical documentation)
            </li>
          </ul>
      </div>
    </section>
  );
}
