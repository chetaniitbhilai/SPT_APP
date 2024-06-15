import React from 'react';
import Login from './Components/Login';

const App = () => {
  const verifyLogin=(details)=>{
    console.log(details);
    /*
       use axios to fetch result from database

        use post method in body send the details that has email password 
        send the result accordingly
        
    
    */

  }

  return (
    <div>
   <Login  verifyLogin={verifyLogin}/>
    </div>
  );
};

export default App;