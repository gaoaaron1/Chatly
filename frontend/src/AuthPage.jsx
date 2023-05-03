import axios from 'axios'


const AuthPage = (props) => {
    const onSubmit = async (e) => {
      e.preventDefault();
      const { value } = e.target[0];

      /*
      //Makes a call to our backend node
      axios.post(
        'http://localhost:3001/authenticate',
        {username: value}
      )
      .then(r => props.onAuth({ ...r.data, secret: value }))
      .catch(e => console.log('error', e))  
    };*/


    try {
      // Send a POST request to your Node.js server to insert the user into MongoDB
      const response = await axios.post('http://localhost:3001/authenticate', { username: value });
      
      // Pass the user object returned from the server to the onAuth callback
      props.onAuth({ ...response.data, secret: value });
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
    return (
      <div className="background">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-title">Welcome 👋</div>
  
          <div className="form-subtitle">Set a username to get started</div>
  
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthPage;