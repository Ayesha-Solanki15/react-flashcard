import React from 'react'
import FlashcardItem from './FlashcardItem'

const FlashcardList = ({data}) => {
  return (
    <div className='card-grid'>
      {data.map((flashcard) => <FlashcardItem key={flashcard.id} cardData={flashcard} />)}
    </div>
  )
}

export default FlashcardList