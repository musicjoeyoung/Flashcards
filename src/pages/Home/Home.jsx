import React from 'react'
import Flashcard from '../../components/Flashcard/Flashcard'
import CodeEditor from '../../components/CodeEditor/CodeEditor'
//import FlashcardForm from '../../components/FlashcardForm/FlashcardForm'

const Home = () => {
    //const token = localStorage.getItem('token')
    return (
        <div>
            <Flashcard />
            <CodeEditor />
            {/* {token ? (<FlashcardForm />) : null} */}
        </div>
    )
}

export default Home

//maybe this is the file to add conditional rendering for the flashcard form
//should I store the JWT in the database for more protection? Patrick's point was
//that the JWT is stored in the browser and can be accessed by anyone who has access to the browser
//Storing it in the database would make it more secure, but it would also make it more difficult to access
