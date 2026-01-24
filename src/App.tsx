import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                <h1 className="text-6xl md:text-8xl font-display font-bold text-tomo-red mb-6 tracking-tight">TOMO</h1>
                <p className="text-xl md:text-2xl text-tomo-dark font-medium tracking-wide">Santa Catalina</p>
                <div className="mt-12 p-6 border border-tomo-green/20 rounded-lg bg-white/50 backdrop-blur-sm">
                  <p className="text-tomo-green font-medium">Opening February 14, 2026</p>
                </div>
              </div>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
