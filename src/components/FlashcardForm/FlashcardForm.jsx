import { useRef, useState } from 'react'
import "./FlashcardForm.scss"
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const FlashcardForm = ({ dataPath }) => {
    console.log("dataPath from form: ", dataPath)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const formRef = useRef(null);
    const arrayMethods = `${baseURL}/array-methods`
    const objectMethods = `${baseURL}/object-methods`

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        if (!token) {
            console.error('No token found')
            return;
        }

        try {
            await axios.post(dataPath === 'arrays' ? arrayMethods : objectMethods, {
                name: formRef.current.name.value,
                definition: formRef.current.definition.value,
                code: formRef.current.code.value
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            formRef.current.reset();
            setIsSuccessful(true)
        } catch (error) {
            console.error('Error submitting flashcard:', error)

        }


    }
    return (
        <>
            <form className="form" onSubmit={handleSubmit} ref={formRef}>
                <label htmlFor="name" >name:</label>
                <input type="text" id="name" name="name" autoComplete="method name" required />
                <label htmlFor="definition">definition:</label>
                <input type="text" id="definition" name="definition" autoComplete="method description" required />
                <label htmlFor="code">code:</label>
                <textarea type="text" id="code" name="code" required />
                <button type="submit">Submit</button>
                {isSuccessful && <p className="submit-success">Submission successful!</p>}
            </form>
        </>
    )
}

export default FlashcardForm