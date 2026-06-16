import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Header } from "./app/components/Header/Header";
import { AboutPage } from "./app/pages/AboutPage";
import { HomePage } from "./app/pages/HomePage";

export function AppRoutes() {
  return (
    <>
      <Header />
      <main className="container" id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
