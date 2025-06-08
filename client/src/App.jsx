import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Habits from "./pages/Habits";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}
export default App;

