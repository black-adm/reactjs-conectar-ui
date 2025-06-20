import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RoutesApp } from "./routes/RoutesApp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
