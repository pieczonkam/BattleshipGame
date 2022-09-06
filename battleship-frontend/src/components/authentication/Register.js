import React, { useState, useEffect } from 'react';
import { registerRequest }            from '../../utils/requestsAPI';

import { validateEmail }              from '../../utils/utils';
import { switchNavLink }              from '../../utils/utils';

function Register() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        switchNavLink('navlink-5');
    }, []);

    const errors = {
        email_missing:   'Proszę podać adres e-mail',
        uname_missing:   'Proszę podać nazwę użytkownika',
        pass_01_missing: 'Proszę podać hasło',
        pass_02_missing: 'Proszę powtórzyć hasło',
        wrong_email:     'Podano błędny adres e-mail',
        email_taken:     'Podany adres e-mail jest już zajęty',
        uname_taken:     'Podana nazwa użytkownika jest już zajęta',
        uname_too_short: 'Podana nazwa użytkownika jest za krótka (min 3 znaki)',
        uname_too_long:  'Podana nazwa użytkownika jest za długa (max 20 znaków)',
        pass_too_short:  'Podane hasło jest za krótkie (min 8 znaków)',
        pass_too_long:   'Podane hasło jest za długie (max 60 znaków)',
        pass_diff:       'Podano różne hasła',
        server_error:    'Coś poszło nie tak, spróbuj ponownie'
    };

    const register_success_message = 'Rejestracja powiodła się';

    const handleSubmit = async (e) => {
        e.preventDefault();

        var { email, uname, pass_01, pass_02 } = document.forms[0];
        
        var messages_arr = [];
        var user_valid = true;

        if (email.value.length === 0 || uname.value.length === 0 || pass_01.value.length === 0 || pass_02.value.length === 0) {
            user_valid = false;
            if (email.value.length === 0) {
                messages_arr.push({ name: 'email_missing', message: errors.email_missing });
            }
            if (uname.value.length === 0) {
                messages_arr.push({ name: 'uname_missing', message: errors.uname_missing });
            }
            if (pass_01.value.length === 0) {
                messages_arr.push({ name: 'pass_01_missing', message: errors.pass_01_missing });
            }
            if (pass_02.value.length === 0) {
                messages_arr.push({ name: 'pass_02_missing', message: errors.pass_02_missing });
            }
        } else {
            if (!validateEmail(email.value)) {
                user_valid = false;
                messages_arr.push({ name: 'wrong_email', message: errors.wrong_email });
            }
            if (uname.value.length < 3) {
                user_valid = false;
                messages_arr.push({ name: 'uname_too_short', message: errors.uname_too_short });
            }
            if (uname.value.length > 20) {
                user_valid = false;
                messages_arr.push({ name: 'uname_too_long', message: errors.uname_too_long });
            }
            if (pass_01.value.length < 8) {
                user_valid = false;
                messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
            }
            if (pass_01.value.length > 60) {
                user_valid = false;
                messages_arr.push({ name: 'pass_too_long', message: errors.pass_too_long });
            }
            if (pass_01.value !== pass_02.value) {
                user_valid = false;
                messages_arr.push({ name: 'pass_diff', message: errors.pass_diff });
            } 
        }

        if (user_valid) {
            const [ response, status ] = await registerRequest({
                username: uname.value,
                email: email.value,
                password: pass_01.value
            });

            if (status === 400) {
                user_valid = false;
                if (response === 'Username taken') {
                    messages_arr.push({ name: 'uname_taken', message: errors.uname_taken });
                } else if (response === 'Email taken') {
                    messages_arr.push({ name: 'email_taken', message: errors.email_taken });
                }
            } else if (status !== 200) {
                user_valid = false
                messages_arr.push({ name: 'server_error', message: errors.server_error });
            }
        }

        if (user_valid) {
            messages_arr.push({ name: 'register_success', message: register_success_message });
        }

        setMessages(messages_arr);
    };

    const renderMessage = (name, type = 'default') => {
        const message = messages.find(m => m.name === name);

        if (message) {
            if (type === 'error_main' || type === 'success') {
                document.forms[0].reset();
            }

            return (
                type === 'default' ?
                <label className='Auth-form-error text-danger'>{message.message}</label> :
                type === 'error_main' ?
                <label className='Auth-form-error-main text-danger w-100'>{message.message}</label> :
                <label className='Auth-form-success text-success w-100'>{message.message}</label>
            );
        }
    };
    
    return (
        <div className='Auth-form-container my-4'>
            <form className='Auth-form' onSubmit={handleSubmit}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Rejestracja</h3>
                    {renderMessage('server_error', 'error_main')}
                    {renderMessage('register_success', 'success')}
                    <div className='form-group mt-3'>
                        <label className='Auth-form-label'>Adres e-mail</label>
                        <input type='text' className='form-control mt-1 rounded-0' placeholder='Wprowadź adres e-mail' name='email' />
                        {renderMessage('email_missing')}
                        {renderMessage('wrong_email')} 
                        {renderMessage('email_taken')}            
                    </div>
                    <div className='form-group mt-3'>
                        <label className='Auth-form-label'>Nazwa użytkownika</label>
                        <input type='text' className='form-control mt-1 rounded-0' placeholder='Wprowadź nazwę użytkownika' name='uname' />
                        {renderMessage('uname_missing')}
                        {renderMessage('uname_taken')}   
                        {renderMessage('uname_too_short')}
                        {renderMessage('uname_too_long')}        
                    </div>
                    <div className='form-group mt-3'>
                        <label className='Auth-form-label'>Hasło</label>
                        <input type='password' className='form-control mt-1 rounded-0' placeholder='Wprowadź hasło' name='pass_01'/>
                        {renderMessage('pass_01_missing')}
                        {renderMessage('pass_too_short')}
                        {renderMessage('pass_too_long')}
                    </div>
                    <div className='form-group mt-3'>
                        <label className='Auth-form-label'>Powtórz hasło</label>
                        <input type='password' className='form-control mt-1 rounded-0' placeholder='Wprowadź hasło' name='pass_02'/>
                        {renderMessage('pass_02_missing')}
                        {renderMessage('pass_diff')}
                    </div>
                    <div className='d-grid gap-2 mt-4'>
                        <button type='submit' className='btn btn-primary rounded-0'>
                            Zarejestruj się
                        </button>
                    </div>
                    <p className='text-right mt-2'>
                        Masz już konto? <a href='/login'>Zaloguj się!</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;