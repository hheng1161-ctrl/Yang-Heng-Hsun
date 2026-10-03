import { useState } from 'react';
import { useTheme } from './hooks/useTheme.js';
import { useToast } from './hooks/useToast.js';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import Martial from './components/Martial.jsx';
import Contact from './components/Contact.jsx';
import Toast from './components/Toast.jsx';
import ContactModal from './components/ContactModal.jsx';
import { Footer, ToTop } from './components/Chrome.jsx';

export default function App() {
  const { isLight, toggle } = useTheme();
  const { toasts, push, remove } = useToast();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <ScrollProgress />

      <Navbar isLight={isLight} onToggleTheme={toggle} />

      <main>
        <Hero />
        <About />
        <ExperienceTimeline />
        <Projects />
        <Certificates />
        <Martial />
        <Contact onOpenForm={() => setFormOpen(true)} onToast={push} />
      </main>

      <Footer />
      <ToTop />

      <ContactModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onToast={push}
      />

      <Toast toasts={toasts} onRemove={remove} />
    </>
  );
}
