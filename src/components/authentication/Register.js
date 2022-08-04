import React, { useState } from 'react';

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
        email_wrong:    'Niepoprawny adres e-mail',
        email_taken:    'Adres e-mail jest już zajęty',
        uname:          'Nazwa użytkownika jest już zajęta',
        pass_too_short: 'Hasło powinno składać się z przynajmniej 8 znaków',
        pass_diff:      'Podano różne hasła'
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

        if (email_exists) {
            user_valid = false;
            error_messages_arr.push({ name: 'email_taken', message: errors.email_taken });
        } else if (!validateEmail(email.value)) {
            user_valid = false;
            error_messages_arr.push({ name: 'email_wrong', message: errors.email_wrong });
        }

        if (uname_exists) {
            user_valid = false;
            error_messages_arr.push({ name: 'uname', message: errors.uname });
        }

        if (pass_01.value.length < 8) {
            user_valid = false;
            error_messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
        }

        if (pass_01.value !== pass_02.value) {
            user_valid = false;
            error_messages_arr.push({ name: 'pass_diff', message: errors.pass_diff });
        }

        setErrorMessages(error_messages_arr);
        setIsSubmitted(user_valid);
    };

    const renderErrorMessage = name => {
        const error_message = error_messages.find(em => em.name === name);

        if (error_message) {
            return (
                <div className='error'>{error_message.message}</div>
            );
        }
    };
        
    const renderForm = (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Adres e-mail</label>
                    <input type='text' name='email' required />
                    {renderErrorMessage('email_wrong')} 
                    {renderErrorMessage('email_taken')}
                </div>
                <div className='input-container'>
                    <label>Nazwa użytkownika</label>
                    <input type='text' name='uname' required />
                    {renderErrorMessage('uname')}
                </div>
                <div className='input-container'>
                    <label>Hasło</label>
                    <input type='password' name='pass_01' required />
                    {renderErrorMessage('pass_too_short')}
                </div>
                <div className='input-container'>
                    <label>Powtórz hasło</label>
                    <input type='password' name='pass_02' required />
                    {renderErrorMessage('pass_diff')}
                </div>
                <div className='button-container'>
                    <input type='submit' value='Zarejestruj się' />
                </div>
                <div className='link-container'>
                    Masz już konto?{'\n'}
                    <a href='/login'>Zaloguj się!</a>
                </div>
            </form>
        </div>
    );    

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='title'>Rejestracja</div>
                {is_submitted ? <div>Rejestracja powiodła się</div> : renderForm}
            </div>
        </div>
    );
}

export default Register;