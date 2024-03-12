import React, { useState, useRef, useEffect } from "react";

const FlashcardItem = ({ cardData }) => {
  const [toggleCard, setToggleCard] = useState(false);
  const [height, setHeight] = useState('initial');
  const frontRef = useRef();
  const backRef = useRef()
  const toggleHandler = () => {
    setToggleCard((prevState) => !prevState);
  };

  function setMaxHeight() {
    const frontHeight = frontRef.current.getBoundingClientRect().height
    const backHeight = backRef.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(() => {
    setMaxHeight()
  }, [cardData.question, cardData.answer, cardData.options])

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () =>  {
      window.removeEventListener('resize', setMaxHeight)
    }
  })

  return (
    <div className={`card ${toggleCard ? "flip" : ""}`}
    style={{height: height}} onClick={toggleHandler}>
      <div className="front" ref={frontRef} >
        {cardData.question}
        <div className="flashcard-options" >
          {cardData.options.map((option) => <div key={option} className="flashcard-option"> {option}</div>)}
        </div>
      </div>
      <div className="back" ref={backRef}>
        {cardData.answer}
      </div>
    </div>
  );
};

export default FlashcardItem;
