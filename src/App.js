import "./App.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Header_route from "./Routing/Header_route";
import Auth_context from "./common_components/Auth_context";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Auth_context>
        <BrowserRouter>
          <Header_route />
        </BrowserRouter>
      </Auth_context>
    </div>
  );
}

export default App;
