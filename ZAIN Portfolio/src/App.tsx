import { lazy, Suspense, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Process = lazy(() => import("./components/Process"));
const Explorations = lazy(() => import("./components/Explorations"));
const Contact = lazy(() => import("./components/Contact"));

function SectionFallback() {
  return <div className="h-96 bg-black" />;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      {!isLoading && (
        <div className="bg-black min-h-screen w-full selection:bg-[#DC143C]/30">
          <Navbar />
          <Suspense fallback={<SectionFallback />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Services />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Process />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Explorations />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </div>
      )}
    </>
  );
}
