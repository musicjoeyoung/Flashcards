import { useRef } from 'react'
import "./FlashcardForm.scss"
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const FlashcardForm = () => {
    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        console.log(token)

        if (!token) {
            console.error('No token found')
            return;
        }

        try {
            await axios.post(`${baseURL}/array-methods`, {
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
        } catch (error) {
            console.error('Error submitting flashcard:', error)

        }


    }
    return (
        <form className="form" onSubmit={handleSubmit} ref={formRef}>
            <label htmlFor="name" >name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="definition">definition:</label>
            <input type="text" id="definition" name="definition" />
            <label htmlFor="code">code:</label>
            <textarea type="text" id="code" name="code" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default FlashcardForm