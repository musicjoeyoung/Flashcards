import "./Profile.scss"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
    const URL = import.meta.env.VITE_APP_BASE_URL;
    const [profile, setProfile] = useState({})
    const token = localStorage.getItem('token')

    const getProfile = async () => {
        try {
            const response = await axios.get(`${URL}/users/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(response.data)
            setProfile(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="profile">
            <h2>Profile</h2>
            <p>{profile.username}</p>
            <p>{profile.email}</p>
        </div>
    )
}

export default Profile