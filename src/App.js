import { useState, useEffect } from "react";
import FlashcardList from "./components/FlashcardList";
import Form from "./components/Form";
import axios from "axios";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState([]);

  const getFlashCards = (data) => {
    setFlashcards(data);
  }

  return (
    <>
      <Form getFlashCards={getFlashCards}/>
      <div className="container">
        <FlashcardList data={flashcards} />
      </div>
    </>
  );
}

export default App;
