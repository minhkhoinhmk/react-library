import "./App.css";
import { Carousel } from "./layouts/HomePage/Carousel";
import { ExploreTopBooks } from "./layouts/HomePage/ExploreTopBooks";
import { Heros } from "./layouts/HomePage/Heros";
import { LibraryService } from "./layouts/HomePage/LibraryService";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryService />
    </div>
  );
}

export default App;
