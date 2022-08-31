import React, { useState, useEffect } from 'react';
import { loginRequest }               from '../../utils/requestsAPI';
import { switchNavLink }              from '../../utils/utils';
import { setLoginData }               from '../../utils/utilsAPI';
 
function Login() {
    const [error_messages, setErrorMessages] = useState([]);

    useEffect(() => {
        switchNavLink('navlink-4');
    }, []);

    const errors = {
        email_missing: 'Proszę podać adres e-mail',
        pass_missing:  'Proszę podać hasło',
        wrong_email:   'Podano błędny adres e-mail',
        wrong_pass:    'Podano błędne hasło',
        server_error:  'Coś poszło nie tak, spróbuj ponownie'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        var { email, pass } = document.forms[0];
    
        var error_messages_arr = [];

        if (email.value.length === 0 || pass.value.length === 0) {
            if (email.value.length === 0) {
                error_messages_arr.push({ name: 'email_missing', message: errors.email_missing });
            }
            if (pass.value.length === 0) {
                error_messages_arr.push({ name: 'pass_missing', message: errors.pass_missing });
            }
        } else {
            const [ response, status ] = await loginRequest({
                email: email.value,
                password: pass.value
            });

            if (status === 404) {
                if (response === 'Wrong email') {
                    error_messages_arr.push({ name: 'wrong_email', message: errors.wrong_email });
                } else if (response === 'Wrong password') {
                    error_messages_arr.push({ name: 'wrong_pass', message: errors.wrong_pass });
                }
            } else if (status !== 200) {
                error_messages_arr.push({ name: 'server_error', message: errors.server_error });
            } else {
                await setLoginData(response);
                window.location.reload(false);
            }            
        } 

        setErrorMessages(error_messages_arr);
    };

    const renderErrorMessage = (name, type = 'default') => {
        const error_message = error_messages.find(em => em.name === name);
        
        if (error_message) {
            if (type === 'error_main') {
                document.forms[0].reset();
            }

            return (
                type === 'default' ?
                <label className='Auth-form-error text-danger'>{error_message.message}</label> :
                <label className='Auth-form-error-main text-danger w-100'>{error_message.message}</label>
            );
        }
    };

    return (
        <div className='Auth-form-container my-4'>
            <form className='Auth-form' onSubmit={handleSubmit}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Logowanie</h3>
                    {renderErrorMessage('server_error', 'error_main')}
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
        </div>
    );
}

export default Login;