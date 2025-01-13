import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getPetition, signPetition, submitPetitionResponse, getSetting, checkSignature } from '../../Utils/Requests'
import { useAuth } from '../../Utils/AuthProvider'
import './Petition.css'

interface Petition {
    id: number,
    petitionerEmail: string,
    title: string,
    content: string,
    status: string,
    response: string,
    signatureCount: number
}

function Petition() {
    const { id } = useParams<{ id: string }>();
    const petitionId: number = Number(id);
    const [petition, setPetition] = useState<Petition>()
    const [threshold, setThreshold] = useState("")
    const {token, isAdmin} = useAuth();
    const [signed, setSigned] = useState(true)
    const navigate = useNavigate();
    // const token = localStorage.getItem('token');

    const [responseText, setResponseText] = useState("");

     useEffect(() => {
            if (!token) {
            navigate('/login'); // Redirect to login if no token
            }
        }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await getPetition(token, petitionId);  // Await the async function
                    setPetition(response.data)
                    const signatureResponse = await checkSignature(petitionId, token)
                    setSigned(signatureResponse.data)
                    const thresholdResponse = await getSetting()
                    setThreshold(thresholdResponse.data)
                } catch (error) {
                    console.error('Error fetching petitions:', error);  // Handle any errors
                }
            }
        };
        fetchData();
    },[id])

    const handleSign = async (id: number|undefined) => {
        if (id === undefined) {
            return
        }
        if (token) {
            try {
                const response = await signPetition(id, token);
                navigate(0)
            } catch (error) {
                console.error('Error signing petition:', error)
            }
        }
    }

    const submitResponse = async (id: number|undefined) => {
        if (!id) {
            alert("Petition ID is missing!");
            return;
        }
        if (!responseText.trim()) {
            alert("Response cannot be empty!");
            return;
        }
        if (token) {
            try {
                const responsePayload = {responseText}
                const response = await submitPetitionResponse(id, token, responsePayload)
                console.log("Response submitted", response)
                navigate(0)
            } catch (error) {
                console.error('Error submitting petition response', error)
            }
        }
    }

  return (
    <div className="petitionPage">
        <div className="title">
            {petition?.title} <div className="status">({petition?.status})</div>
        </div>
        <div className="content">
            {petition?.content}
        </div>
        <div className="signatures">
            {petition?.signatureCount} / {threshold} signatures
        </div>
        <div className="signatureBar">
            <progress id="progressBar" value={petition?.signatureCount} max={threshold}></progress>
        </div>
        {petition?.status == "closed" ? (
            <></>
        ) : (
            signed ? (
                <p style={{fontStyle: 'italic'}}>You have signed this petition.</p>
            ) : (
                <div className="petitionPageButton">
                    <button onClick={() => handleSign(petition?.id)}>Sign</button>
                </div>
            )
        )}

        <div className="information">
            <img src='/icons8-info-50.png' height={20} style={{ verticalAlign: 'text-top', paddingRight: "3px" }}/>At {threshold} signatures, the Shangri-La Government will debate this topic.
        </div>

        {petition?.response == null ? (
            isAdmin ? (
                <div className="responseBox">
                    <h2>Respond to this petition</h2>
                    <textarea
                        placeholder="Write your response here..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                    ></textarea>
                    <button onClick={() => submitResponse(petition?.id)}>Submit</button>
                </div>
            ) : (
                <></>
            )
        ) : (
            <div className='response'>
                {petition.response}
            </div>
        )}

    </div>
  )
}

export default Petition