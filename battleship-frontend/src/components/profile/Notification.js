import React                         from 'react';
import { Tooltip, IconButton }       from '@mui/material';
import DoneIcon                      from '@mui/icons-material/Done';
import ClearIcon                     from '@mui/icons-material/Clear';
import { addFriendRequest, 
        deleteNotificationRequest }  from '../../utils/requestsAPI';
import { logOut }                    from '../../utils/utilsAPI';

function Notification(props) {
    const handleNotificationClick = async (type) => {
        if (type === 'decline') {
            const status = await deleteNotificationRequest(localStorage.getItem('jwt'), props.notification_id);

            if (status === 200) {
                props.onClickDecline();
            } else {
                logOut();
            }
        } else if (type === 'accept') {
            if (props.type === 'invite-friend') {
                const status = await addFriendRequest(localStorage.getItem('jwt'), {
                    user1: props.from_user
                });

                if (status === 200) {
                    props.onClickAccept();
                } else {
                    logOut();
                }
            } else if (props.type === 'invite-game') {
                const status = await deleteNotificationRequest(localStorage.getItem('jwt'), props.notification_id);

                if (status === 200) {
                    props.onClickAccept();
                } else {
                    logOut();
                }
            }
        }
    }
    
    return (
        <div className='border mx-1 my-2 p-2'>
            {
                props.type === 'invite-friend' ? 
                <div className='d-flex flex-column'>
                    <div className='mb-2 d-flex flex-column'>
                        <span className='text-muted'><em>{props.date}</em></span>
                        <span>Użytkownik <span className='text-bold'>{props.username}</span> zaprasza Cię do znajomych</span>
                    </div>
                    <div className='d-flex flex-row justify-content-start'>
                        <Tooltip title='Akceptuj' placement='top'>
                            <IconButton aria-label='invite-accept' size='small' color='success' className='p-1' onClick={() => handleNotificationClick('accept')}>
                                <DoneIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Odrzuć' placement='top'>
                            <IconButton aria-label='invite-decline' size='small' color='error' className='p-1' onClick={() => handleNotificationClick('decline')}>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>: 
                props.type === 'invite-game' ? 
                <div className='d-flex flex-column'>
                    <div className='mb-2 d-flex flex-column'>
                        <span className='text-muted'><em>{props.date}</em></span>
                        <span>Użytkownik <span className='text-bold'>{props.username}</span> zaprasza Cię do gry</span>
                    </div>
                    <div className='d-flex flex-row justify-content-start'>
                        <Tooltip title='Akceptuj' placement='top'>
                            <IconButton aria-label='game-accept' size='small' color='success' className='p-1' onClick={() => handleNotificationClick('accept')}>
                                <DoneIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Odrzuć' placement='top'>
                            <IconButton aria-label='game-decline' size='small' color='error' className='p-1' onClick={() => handleNotificationClick('decline')}>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>: 
                ''
            }
        </div>
    );
}

export default Notification;