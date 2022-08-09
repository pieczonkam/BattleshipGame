import React, { useState } from 'react';
import { Navigate }        from 'react-router-dom'

function Register() {
    const [error_messages, setErrorMessages] = useState([]);
    const [is_submitted,   setIsSubmitted  ] = useState(false);

    const database = [
        {
            email:    'user1@mail.com',
            uname:    'user1',
            password: '12345678'
        },
        {
            email:    'user2@mail.com',
            uname:    'user2',
            password: 'qwertyui'
        }
    ];

    const errors = {
        email_missing:   'Proszę podać adres e-mail',
        uname_missing:   'Proszę podać nazwę użytkownika',
        pass_01_missing: 'Proszę podać hasło',
        pass_02_missing: 'Proszę powtórzyć hasło',
        wrong_email:     'Podano błędny adres e-mail',
        email_taken:     'Podany adres e-mail jest już zajęty',
        uname_taken:     'Podana nazwa użytkownika jest już zajęta',
        pass_too_short:  'Podane hasło jest za krótkie (min. 8 znaków)',
        pass_diff:       'Podano różne hasła'
    };

    const validateEmail = email => {
        let email_valid = String(email)
              .toLowerCase()
              .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) === null ? false : true;
        return email_valid;
      };

    const handleSubmit = e => {
        e.preventDefault();

        var { email, uname, pass_01, pass_02 } = document.forms[0];
        const email_exists = database.find(user => user.email === email.value);
        const uname_exists = database.find(user => user.uname === uname.value);

        var error_messages_arr = []
        var user_valid = true;

        if (email.value.length === 0 || uname.value.length === 0 || pass_01.value.length === 0 || pass_02.value.length === 0) {
            user_valid = false;
            if (email.value.length === 0) {
                error_messages_arr.push({ name: 'email_missing', message: errors.email_missing });
            }
            if (uname.value.length === 0) {
                error_messages_arr.push({ name: 'uname_missing', message: errors.uname_missing });
            }
            if (pass_01.value.length === 0) {
                error_messages_arr.push({ name: 'pass_01_missing', message: errors.pass_01_missing });
            }
            if (pass_02.value.length === 0) {
                error_messages_arr.push({ name: 'pass_02_missing', message: errors.pass_02_missing });
            }
        } else {
            if (email_exists) {
                user_valid = false;
                error_messages_arr.push({ name: 'email_taken', message: errors.email_taken });
            } else if (!validateEmail(email.value)) {
                user_valid = false;
                error_messages_arr.push({ name: 'wrong_email', message: errors.wrong_email });
            }
    
            if (uname_exists) {
                user_valid = false;
                error_messages_arr.push({ name: 'uname_taken', message: errors.uname_taken });
            }
    
            if (pass_01.value.length < 8) {
                user_valid = false;
                error_messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
            }
    
            if (pass_01.value !== pass_02.value) {
                user_valid = false;
                error_messages_arr.push({ name: 'pass_diff', message: errors.pass_diff });
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
                        <h3 className='Auth-form-title'>Rejestracja</h3>
                        <div className='form-group mt-3'>
                            <label className='Auth-form-label'>Adres e-mail</label>
                            <input type='text' className='form-control mt-1' placeholder='Wprowadź adres e-mail' name='email' />
                            {renderErrorMessage('email_missing')}
                            {renderErrorMessage('wrong_email')} 
                            {renderErrorMessage('email_taken')}            
                        </div>
                        <div className='form-group mt-3'>
                            <label className='Auth-form-label'>Nazwa użytkownika</label>
                            <input type='text' className='form-control mt-1' placeholder='Wprowadź nazwę użytkownika' name='uname' />
                            {renderErrorMessage('uname_missing')}
                            {renderErrorMessage('uname_taken')}           
                        </div>
                        <div className='form-group mt-3'>
                            <label className='Auth-form-label'>Hasło</label>
                            <input type='password' className='form-control mt-1' placeholder='Wprowadź hasło' name='pass_01'/>
                            {renderErrorMessage('pass_01_missing')}
                            {renderErrorMessage('pass_too_short')}
                        </div>
                        <div className='form-group mt-3'>
                            <label className='Auth-form-label'>Powtórz hasło</label>
                            <input type='password' className='form-control mt-1' placeholder='Wprowadź hasło' name='pass_02'/>
                            {renderErrorMessage('pass_02_missing')}
                            {renderErrorMessage('pass_diff')}
                        </div>
                        <div className='d-grid gap-2 mt-3'>
                            <button type='submit' className='btn btn-primary'>
                                Zarejestruj się
                            </button>
                        </div>
                        <p className='text-right mt-2'>
                            Masz już konto? <a href='/login'>Zaloguj się!</a>
                        </p>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default Register;