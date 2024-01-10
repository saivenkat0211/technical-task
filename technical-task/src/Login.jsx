import React,{useState} from 'react';
import Home from './Home'
import Home2 from './Home2'
import axios from 'axios'


function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [something,setSomething] = useState('false')
    const [triggered,setTriggered] = useState('false')
    async function handleSubmit(ev){
        ev.preventDefault();
        console.log("hsda")
        console.log("submitted" + username +' ' + password);
        const requestOptions = {
            method: 'POST',               
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({username,password}),  
          };
          
          const response = await fetch('http://localhost:4004/signin', requestOptions)
          console.log(response);
          if(response.ok){
            setSomething('true')
          }
          else{
            setTriggered('true')
          }
        // const response = await axios.post('signin',{username,password})

        
    }
    return (
        <div>
            
            <form onSubmit={handleSubmit} >
                <h2>Enter username</h2>
                <input value = {username} onChange = {ev=>setUsername(ev.target.value)} type = "text" placeholder = "username" /><br>
                </br>
                <h2>Enter password</h2>
                <input value = {password} onChange = {ev=>setPassword(ev.target.value)} type = "password" placeholder = "password" />
                <button>submit</button>
            </form>
            {something == 'true' && (
                <Home></Home>
            )}
            {triggered == 'true' &&(
                <Home2></Home2>
            ) }

        </div>
    )
}
export default Login;