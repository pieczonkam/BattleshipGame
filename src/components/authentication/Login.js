import React, { useState } from 'react';

function Login() {
    const [error_message, setErrorMessage] = useState({});
    const [is_submitted,  setIsSubmitted ] = useState(false);

    const database = [
        {
            email:    'user1@mail.com',
            password: 'pass1'
        },
        {
            email:    'user2@mail.com',
            password: 'pass2'
        }
    ];

    const errors = {
        email: 'Niepoprawny adres e-mail',
        pass:  'Niepoprawne hasło'
    };

    const handleSubmit = e => {
        e.preventDefault();

        var { email, pass } = document.forms[0];
        const user_data = database.find(user => user.email === email.value);

        if (user_data) {
            if (user_data.password !== pass.value) {
                setErrorMessage({ name: 'pass', message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            setErrorMessage({ name: 'email', message: errors.email });
        }
    };

    const renderErrorMessage = name => 
        name === error_message.name && (
            <div className='error'>{error_message.message}</div>
        );

    const renderForm = (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Adres e-mail</label>
                    <input type='text' name='email' required />
                    {renderErrorMessage('email')}
                </div>
                <div className='input-container'>
                    <label>Hasło</label>
                    <input type='password' name='pass' required />
                    {renderErrorMessage('pass')}
                </div>
                <div className='button-container'>
                    <input type='submit' value='Zaloguj się' />
                </div>
                <div className='link-container'>
                    Chcesz założyć nowe konto?{'\n'}
                    <a href='/register'>Zarejestruj się!</a>
                </div>
            </form>
        </div>
    );    

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='title'>Logowanie</div>
                {is_submitted ? <div>Logowanie powiodło się</div> : renderForm}
            </div>
        </div>
    );
}

export default Login;