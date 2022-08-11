import React                  from 'react';
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';


import ChangeUserData         from './ChangeUserData';      

function Profile() {
    return (
        <div className='Profile-container my-4 d-flex flex-column flex-md-row'>
            <div className='Profile-user-panel d-flex flex-column'>
                <div className='Profile-user-info d-flex flex-column p-3'>
                    <div>
                        <FontAwesomeIcon icon={faUser} fixedWidth/>
                        <span>&nbsp;&nbsp;User123</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} fixedWidth/>       
                        <span>&nbsp;&nbsp;User123@mail.com</span>
                    </div>
                </div>
                <div className='Profile-user-change-data p-3'>
                    <ChangeUserData aria_controls='change-uname-collapse' button_text='Zmień nazwę użytkownika' button_className='w-100 mb-3 rounded-0' collapse_className='p-2 mb-3 border'>
                        A
                    </ChangeUserData>
                    <ChangeUserData aria_controls='change-email-collapse' button_text='Zmień adres e-mail'      button_className='w-100 mb-3 rounded-0' collapse_className='p-2 mb-3 border'>
                        B
                    </ChangeUserData>
                    <ChangeUserData aria_controls='change-pass-collapse'  button_text='Zmień hasło'             button_className='w-100 mb-3 rounded-0' collapse_className='p-2 mb-3 border'>
                        C
                    </ChangeUserData>
                </div>
            </div>            
            <div className='Profile-table-container p-3'>

            </div>
        </div>
    );
}

export default Profile;