import React, { useState } from 'react';
import { Navigate }        from 'react-router-dom';
 
function Login() {
    const [error_messages, setErrorMessages] = useState([]);
    const [is_submitted,   setIsSubmitted  ] = useState(false);

    const database = [
        {
            email:    'user1@mail.com',
            password: '12345678'
        },
        {
            email:    'user2@mail.com',
            password: 'qwertyui'
        }
    ];

    const errors = {
        email_missing: 'Proszę podać adres e-mail',
        pass_missing:  'Proszę podać hasło',
        wrong_email:   'Podano błędny adres e-mail',
        wrong_pass:    'Podano błędne hasło'
    };

    const handleSubmit = e => {
        e.preventDefault();

        var { email, pass } = document.forms[0];
        const user_data = database.find(user => user.email === email.value);

        var error_messages_arr = [];
        var user_valid         = true;

        if (email.value.length === 0 || pass.value.length === 0) {
            user_valid = false;
            if (email.value.length === 0) {
                error_messages_arr.push({ name: 'email_missing', message: errors.email_missing });
            }
            if (pass.value.length === 0) {
                error_messages_arr.push({ name: 'pass_missing', message: errors.pass_missing });
            }
        } else {
            if (user_data) {
                if (user_data.password !== pass.value) {
                    user_valid = false;
                    error_messages_arr.push({ name: 'wrong_pass', message: errors.wrong_pass });
                }
            } else {
                user_valid = false;
                error_messages_arr.push({ name: 'wrong_email', message: errors.wrong_email });
            }
        } 

        setErrorMessages(error_messages_arr);
        setIsSubmitted(user_valid);
    };

    const renderErrorMessage = name => {
        const error_message = error_messages.find(em => em.name === name);
        
        if (error_message) {
            return (
                <label className='Auth-form-error text-danger'>{error_message.message}</label>
            );
        }
    };

    return (
        <>
            {is_submitted ? <Navigate to='/' replace /> :
            <div className='Auth-form-container my-4'>
                <form className='Auth-form' onSubmit={handleSubmit}>
                    <div className='Auth-form-content'>
                        <h3 className='Auth-form-title'>Logowanie</h3>
                        <div className='form-group mt-3'>
                            <label className='Auth-form-label'>Adres e-mail</label>
                            <input type='text' className='form-control mt-1 rounded-0' placeholder='Wprowadź adres e-mail' name='email' />
                            {renderErrorMessage('email_missing')}
                            {renderErrorMessage('wrong_email')}              
                        </div>
                        <div className='form-group mt-3'>
                            <label className='Auth-form-label'>Hasło</label>
                            <input type='password' className='form-control mt-1 rounded-0' placeholder='Wprowadź hasło' name='pass'/>
                            {renderErrorMessage('pass_missing')}
                            {renderErrorMessage('wrong_pass')}
                        </div>
                        <div className='d-grid gap-2 mt-4'>
                            <button type='submit' className='btn btn-primary rounded-0'>
                                Zaloguj się
                            </button>
                        </div>
                        <p className='text-right mt-2'>
                            Nie masz konta? <a href='/register'>Zarejestruj się!</a>
                        </p>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default Login;