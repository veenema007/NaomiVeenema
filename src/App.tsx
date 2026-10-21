import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Agenda from '@/pages/Agenda';
import Partners from '@/pages/Partners';
import News from '@/pages/News';
import NewsArticle from '@/pages/NewsArticle';
import Gallery from '@/pages/Gallery';
import Merchandise from '@/pages/Merchandise';
import Contact from '@/pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/over-mij" element={<About />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/nieuws" element={<News />} />
            <Route path="/nieuws/:id" element={<NewsArticle />} />
            <Route path="/fotogalerij" element={<Gallery />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
