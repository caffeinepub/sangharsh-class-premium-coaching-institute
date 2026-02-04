import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Faculty from '../components/Faculty';
import Courses from '../components/Courses';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Faculty />
        <Courses />
        <Contact />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}

export default HomePage;
