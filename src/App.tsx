import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SportSelector } from "./components/SportSelector";
import { Calculator } from "./components/Calculator";
import { Results } from "./components/Results";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { useForecaster } from "./hooks/useForecaster";

function App() {
  const {
    state,
    result,
    sportConfig,
    selectSport,
    updateField,
    toggleAdvanced,
  } = useForecaster();

  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        <SportSelector selected={state.sport} onSelect={selectSport} />
        {state.sport && sportConfig && (
          <Calculator
            state={state}
            sportConfig={sportConfig}
            onUpdate={updateField}
            onToggleAdvanced={toggleAdvanced}
          />
        )}
        {result && <Results result={result} players={state.players} />}
        {result && <ContactForm />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
