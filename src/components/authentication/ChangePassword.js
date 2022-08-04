import React, { useState } from 'react';

function ChangePassword() {
    const [error_messages, setErrorMessages] = useState([]);
    const [is_submitted,   setIsSubmitted  ] = useState(false);

    const user_email = 'user1@mail.com';

    const database = [
        {
            email:    'user1@mail.com',
            uname:    'user1',
            password: '12345678'
        }
    ];

    const errors = {
        pass_incorrect: 'Podano niepoprawne hasło',
        pass_too_short: 'Nowe hasło powinno składać się z przynajmniej 8 znaków',
        pass_identical: 'Nowe hasło musi być różne od starego'
    };

    const handleSubmit = e => {
        e.preventDefault();

        var { pass_old, pass_new } = document.forms[0];
        const pass_old_correct = database.find(user => user.email === user_email && user.password === pass_old.value);

        var error_messages_arr = [];
        var user_valid         = true;

        if (!pass_old_correct) {
            user_valid = false;
            error_messages_arr.push({ name: 'pass_incorrect', message: errors.pass_incorrect });
        }

        if (pass_new.value.length < 8) {
            user_valid = false;
            error_messages_arr.push({ name: 'pass_too_short', message: errors.pass_too_short });
        }

        if (pass_old.value === pass_new.value) {
            user_valid = false;
            error_messages_arr.push({ name: 'pass_identical', message: errors.pass_identical }); 
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
                    <label>Stare hasło</label>
                    <input type='password' name='pass_old' required />
                    {renderErrorMessage('pass_incorrect')}
                </div>
                <div className='input-container'>
                    <label>Nowe hasło</label>
                    <input type='password' name='pass_new' required />
                    {renderErrorMessage('pass_too_short')}
                    {renderErrorMessage('pass_identical')}
                </div>
                <div className='button-container'>
                    <input type='submit' value='Zmień hasło' />
                </div>
            </form>
        </div>
    );    

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='title'>Zmiana hasła</div>
                {is_submitted ? <div>Hasło zmienione pomyślnie</div> : renderForm}
            </div>
        </div>
    );
}

export default ChangePassword;