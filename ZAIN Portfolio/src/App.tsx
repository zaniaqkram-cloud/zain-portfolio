import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import SelectedWorks from "./components/SelectedWorks";
import Journal from "./components/Journal";
import Process from "./components/Process";
import Explorations from "./components/Explorations";
import Contact from "./components/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      {!isLoading && (
        <div>
          <Navbar />
          <Hero />
          <About />
          <Services />
          <SelectedWorks />
          <Journal />
          <Process />
          <Explorations />
          <Contact />
        </div>
      )}
    </>
  );
}
