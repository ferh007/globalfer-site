import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Products from './components/Products.jsx'
import Services from './components/Services.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Services />
        <WhyChooseUs />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
