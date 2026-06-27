import Header from "./sections/Header";
import Sidebar from "./sections/Sidebar";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Competitions from "./sections/Competitions";
import Certificates from "./sections/Certificates";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-8 lg:pt-6 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-13 lg:gap-20 relative">
          {/* Left Sidebar - Sticky */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>



          {/* Right Content - Scrollable */}
          <div className="lg:col-span-8 divide-y divide-slate-300 dark:divide-slate-700">
            <div className="pb-10">
              <TechStack />
            </div>
            <div className="py-10">
              <Projects />
            </div>
            <div className="py-10">
              <Competitions />
            </div>
            <div className="py-10">
              <Certificates />
            </div>
            <div className="py-10">
              <Education />
            </div>
            <div className="pt-10">
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
