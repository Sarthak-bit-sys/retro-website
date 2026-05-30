import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Interests from "./components/Interests";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App crt scanlines" style={{ background: '#0a0e0a' }}>
      <Header />
      <Hero />
      <CaseStudies />
      <About />
      <Interests />
      <Footer />
    </div>
  );
}

export default App;