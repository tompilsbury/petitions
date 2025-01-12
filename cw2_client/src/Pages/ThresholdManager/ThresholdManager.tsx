import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getSetting, updateSetting } from '../../Utils/Requests'
import { useAuth } from '../../Utils/AuthProvider';
import "./ThresholdManager.css"

function ThresholdManager() {
    const {token, isAdmin} = useAuth();
    const [threshold, setThreshold] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token)
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await getSetting();  // Await the async function
                    console.log(response)
                    setThreshold(response.data)
                } catch (error) {
                    console.error('Error fetching signature threshold:', error);  // Handle any errors
                }
            }
        };
        fetchData();
    }, [])

    const updateThreshold = async () => {
        console.log(threshold)
        if (token) {
            try {
                const response = await updateSetting(threshold, token);
                navigate(0)
            } catch (error) {
                console.error('Error updating petition threshold:', error)
            }
        }
    }

    return (
        <div className="thresholdManager">
            <div className="title">
                <h1>Update the current signature threshold for <p>all</p> petitions</h1>
            </div>
            <input type="number" name="threshold" min="1" step="1" defaultValue={threshold} onChange={(e) => setThreshold(e.target.value)} />
            <button onClick={() => updateThreshold()}>Submit</button>
        </div>
    )
}

export default ThresholdManager