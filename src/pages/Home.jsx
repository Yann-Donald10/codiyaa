import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import About from "../components/About";
import Services from "../components/services";
import Contact from "../components/contact";

const Home = () => {
  return (
    <>
      <Navbar />
      <Overview />
      <About />
      <Services />
      <Contact />
    </>
  );
};

export default Home;
