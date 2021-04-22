import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Form from './Form';
import './App.css';
import schema from './FormSchema';


const initialFormValues = {
    name: '',
    email: '',
    password: '',
    tos: false,
};

const initialFormErrors = {
    name: '',
    email: '',
    password: '',
};
const initialUsers = [];
const initialDisabled = true;



function App() {
    
  const [users, setUsers] = useState(initialUsers); //Array of Users
  const [formValues, setFormValues] = useState(initialFormValues); // Object full of Values
  const [formErrors, setFormErrors] = useState(initialFormErrors); // Object holding errors
  const [disabled, setDisabled] = useState(initialDisabled); // Used to disable Submit button

  //Helpers//

  // Event Handlers //


  const inputChange = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({...formErrors, [name]: '',});
    })
    .catch(err => {
      setFormErrors({...formErrors, [name]: err.errors[0],
      });
    })



    setFormValues({...formValues,[name]: value});
  };

  const postNewUser = newUser => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res);
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch(err => {
        console.log(err);
      })
  }

//Posting a new User => goes over to Form.js submit helper 
  const userSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos,
  }
  postNewUser(newUser);
}

// Side Effects //

  useEffect(() => {
    schema.isValid(formValues).then(valid => { //Setting up disabled submit button
      setDisabled(!valid);
    })
  }, [formValues]);



// RETURN
  return (
    <div className="App">
      <h1>New User Sign-Up!</h1>
      <Form values={formValues} update={inputChange} submit={userSubmit} disabled={disabled} errors={formErrors}/>

      {users.map(user => {
        
        if(!user) { return <h2>Loading</h2>}

        return (
          <div key={user.name}>
            <h4>{user.name}</h4>
            <p>Email: {user.email} Password: {user.password}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
