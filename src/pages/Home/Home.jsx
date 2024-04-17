import React from 'react'
import Flashcard from '../../components/Flashcard/Flashcard'
import CodeEditor from '../../components/CodeEditor/CodeEditor'
import FlashcardForm from '../../components/FlashcardForm/FlashcardForm'

const Home = () => {
    return (
        <div>
            <Flashcard />
            <CodeEditor />
            <FlashcardForm />
        </div>
    )
}

export default Home