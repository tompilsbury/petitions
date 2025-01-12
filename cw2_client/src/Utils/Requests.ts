import axios from 'axios';
interface RegisterInputs {
    email: string,
    password: string,
    fullName: string,
    dob: Date | null,
    bioID: string
}

interface LoginUser {
  email: string,
  password: string
}

interface Petition {
  title: string,
  content: string
}
  
const addUser = async (data: RegisterInputs) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/signup', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response; // Success response
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request was made, but no response received
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      // Other errors (e.g., request setup issues)
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
};
const validateUser = async (data: LoginUser) => {
  try {
    const response = await axios.post(`http://localhost:8080/auth/login`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response; // This will return the Axios response object on success
  } catch (error: any) {
    if (error.response) {
      // If the server responded with an error status
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // If the request was made but no response was received
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      // If something else went wrong
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
};


const getPetitions = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:8080/petitions', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // optional, depending on your API
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

const getPetition = async (token: string, id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/petitions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // optional, depending on your API
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

const postPetition = async (data: Petition, token: string) => {
  try {
    const response = await axios.post('http://localhost:8080/petitions', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // optional, depending on your API
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}
  
const signPetition = async (petitionId: number, token: string) => {
  try {
    const response = await axios.post(`http://localhost:8080/petitions/${petitionId}/sign`, null, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

const checkSignature = async (petitionId: number, token: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/petitions/${petitionId}/sign`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

const submitPetitionResponse = async (petitionId: number, token: string, petitionResponse: object) => {
  try {
    const response = await axios.post(`http://localhost:8080/petitions/${petitionId}/submit_response`, petitionResponse, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

const getSetting = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/settings/2`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

const updateSetting = async (value: string, token: string) => {
  try {
    const response = await axios.post(`http://localhost:8080/settings/2`, value, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('Network error:', error.request);
      return { status: 0, data: 'Network error. Please try again.' };
    } else {
      console.error('Error:', error.message);
      return { status: 0, data: error.message };
    }
  }
}

export {addUser, validateUser, getPetitions, getPetition, postPetition, signPetition, checkSignature, submitPetitionResponse, getSetting, updateSetting};