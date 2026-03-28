import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        {/* SportSelector, Calculator, Results, ContactForm will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
