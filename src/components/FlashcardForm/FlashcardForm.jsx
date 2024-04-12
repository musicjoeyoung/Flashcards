import "./FlashcardForm.scss"

const FlashcardForm = () => {
    return (
        <form className="form">
            <label htmlFor="question" >Question:</label>
            <input type="text" id="question" name="question" />
            <label htmlFor="answer">Answer:</label>
            <input type="text" id="answer" name="answer" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default FlashcardForm