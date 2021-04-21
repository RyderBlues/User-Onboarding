import React from 'react';


export default function Form(props) {

    const { values, update, submit, disabled, errors } = props;

    const onChange = evt => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked: value; // Checking if checkbox
        update(name, valueToUse);
    }

    //Submit Helper //
    const onSubmit = evt => {
        evt.preventDefault();
        submit();
        }
    



    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>User Information:</h2>
                {/*Will Put Errors Here */}
                <div>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
                {/* Inputs Below*/}
                <label>Name:&nbsp;
                    <input value={values.name}
                           onChange={onChange}
                           name='name'
                           type='text'
                    />
                </label>
                <label> Email:&nbsp;
                    <input value={values.email}
                           onChange={onChange}
                           name='email'
                           type='text'
                    />
                </label>
                <label> Password:&nbsp;
                    <input value={values.password}
                           onChange={onChange} 
                           name='password'
                           type='password'
                    />
                </label><br/>
                <label>Terms of Service
                    <input type='checkbox'
                           name='tos'
                           checked={values.tos}
                           onChange={onChange}
                    />
                </label><br/>
                <button disabled={disabled}>Submit</button>
            </div>

        </form>
    );
}