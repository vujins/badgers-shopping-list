import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Tutorial } from './components/Tutorial';

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Tutorial />
      <Footer />
    </div>
  );
};
