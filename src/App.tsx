import Title from "./components/Title";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term : string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Title handleInputChange={handleSearch} inputValue={searchTerm}/>
      <Main searchTerm={searchTerm}/>
    </>
  )
}

export default App
