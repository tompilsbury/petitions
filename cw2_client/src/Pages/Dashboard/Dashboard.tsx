import React, {useEffect, useState} from 'react'
import { useAuth } from '../../Utils/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { getPetitions, signPetition, checkSignature } from '../../Utils/Requests';

import "./Dashboard.css"

interface Petition {
    id: number,
    petitionerEmail: string,
    title: string,
    content: string,
    status: string,
    response: string,
    signatureCount: number,
    signatureStatus: boolean | undefined
}

function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [petitions, setPetitions] = useState<Petition[]>([]);
    const [signed, setSigned] = useState(true)
    

    useEffect(() => {
        if (!token) {
        navigate('/login'); // Redirect to login if no token
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await getPetitions(auth.token);  // Await the async function
                    setPetitions(response.data);

                    if (Array.isArray(response?.data)) {
                        const updatedPetitions = await Promise.all(
                            response.data.map(async (petition) => {
                                const signatureResponse = await checkSignature(petition.id, token);
                    
                                return {
                                    ...petition,
                                    signatureStatus: signatureResponse.data
                                };
                            })
                        );
                        setPetitions(updatedPetitions);
                    }
                } catch (error) {
                    console.error('Error fetching petitions:', error);  // Handle any errors
                }
            }
        };
        fetchData();
    }, [token]);

    const handleSign = async (id: number) => {
        if (auth.token) {
            try {
                const response = await signPetition(id, auth.token);
                navigate(0)
            } catch (error) {
                console.error('Error signing petition:', error)
            }
        }
    }

    const redirect = (petitionId: number) => {
        navigate(`/petition/${petitionId}`)
    }
    
    return (
        <div className="dashboard">
            <button onClick={() => navigate('/new_petition')}>Start a petition</button>
            <div className="petitionsList">
                {petitions.map((data) => {
                    return (
                        <div className="petition">
                            <div className="petitionInfo">
                                <a className="title" onClick={() => redirect(data.id)}>{data.title}</a>
                                <div className="status">Status: {data.status}</div>
                            </div>
                            <div className="content">{data.content}</div>
                            <div className="petitionFooter">
                                <div className="email">Posted by {data.petitionerEmail}</div>
                                <div className="signatures">Signatures: {data.signatureCount}</div>
                            </div>
                            {data.status === "closed" ? (
                                <></>
                            ) : data.signatureStatus ? (
                                <p style={{ fontStyle: 'italic', float: 'right' }}>
                                    You have signed this petition.
                                </p>
                            ) : (
                                <button onClick={() => handleSign(data.id)}>Sign</button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>        
    )
}

export default Dashboard