// src/App.jsx
import React from "react";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="w-screen mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6"></h1>
      <Calendar />
    </div>
  );
}

export default App;
