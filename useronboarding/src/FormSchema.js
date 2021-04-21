// Here goes the schema for the form
import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
                 .required('Name is required')
                .min(2, 'Name must be at least 2 letters long.'),
    
    email: yup.string()
              .email('Must be a valid email')
              .required("Email is required"),
    
    password: yup.string()
                 .required('Password is required')
                 .min(6, 'Password must be at least 6 characters long'),

    tos: yup.boolean()
            .oneOf([true], 'Must agree to ToS..')
    
})