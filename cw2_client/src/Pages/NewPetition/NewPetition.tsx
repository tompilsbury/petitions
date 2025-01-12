import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { postPetition } from '../../Utils/Requests';
import "./NewPetition.css";
import { useAuth } from '../../Utils/AuthProvider';

interface Inputs {
    title: string,
    content: string
}

function NewPetition() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<Inputs>({
        title: '',
        content: ''
    })
    const auth = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: type === 'date' ? new Date(value) : value,
        }));
      }
      const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputs)
        console.log(auth.token)
        const res = await postPetition(inputs, auth.token);
        res.status == 200 ? navigate('/dashboard') : navigate('/new_petition')
    };
  return (
    <div className="NewPetition">
      <div className="wrapper">
        <h2>New Petition</h2>
        <form onSubmit={registerUser}>
          <div className="input-box">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={inputs.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="content"
              placeholder="Write your petition information here."
              value={inputs.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box button">
            <input type="Submit" value="Create Petition" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPetition