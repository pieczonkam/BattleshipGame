import React                   from 'react';
import { Tooltip, IconButton } from '@mui/material';
import DoneIcon                from '@mui/icons-material/Done';
import ClearIcon               from '@mui/icons-material/Clear';

function Notification(props) {
    const user = {
        uname: 'user123',
        email: 'user123@mail.com'
    };

    const date = '21.06.2022 15:45';

    return (
        <div className='border mx-1 my-2 p-2'>
            {
                props.type === 'invite-friend' ? 
                <div className='d-flex flex-column'>
                    <div className='mb-2 d-flex flex-column'>
                        <span className='text-muted'><em>{date}</em></span>
                        <span>Użytkownik <span className='text-bold'>{user.uname}</span> zaprasza Cię do znajomych</span>
                    </div>
                    <div className='d-flex flex-row justify-content-start'>
                        <Tooltip title='Akceptuj' placement='top'>
                            <IconButton aria-label='invite-accept' size='small' color='success' className='p-1'>
                                <DoneIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Odrzuć' placement='top'>
                            <IconButton aria-label='invite-decline' size='small' color='error' className='p-1'>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>: 
                props.type === 'invite-game' ? 
                <div className='d-flex flex-column'>
                    <div className='mb-2 d-flex flex-column'>
                        <span className='text-muted'><em>{date}</em></span>
                        <span>Użytkownik <span className='text-bold'>{user.uname}</span> zaprasza Cię do gry</span>
                    </div>
                    <div className='d-flex flex-row justify-content-start'>
                        <Tooltip title='Akceptuj' placement='top'>
                            <IconButton aria-label='game-accept' size='small' color='success' className='p-1'>
                                <DoneIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Odrzuć' placement='top'>
                            <IconButton aria-label='game-decline' size='small' color='error' className='p-1'>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>: 
                props.type === 'delete-friend' ? 
                <div className='d-flex flex-column'>
                    <div className='mb-2 d-flex flex-column'>
                        <span className='text-muted'><em>{date}</em></span>
                        <span>Użytkownik <span className='text-bold'>{user.uname}</span> usunął Cię ze znajomych</span>
                    </div>
                    <div className='d-flex flex-row justify-content-start'>
                        <Tooltip title='Ok' placement='top'>
                            <IconButton aria-label='invite-accept' size='small' color='success' className='p-1'>
                                <DoneIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>: 
                props.type === 'decline-game' ?
                <div className='d-flex flex-column'>
                    <div className='mb-2 d-flex flex-column'>
                        <span className='text-muted'><em>{date}</em></span>
                        <span>Użytkownik <span className='text-bold'>{user.uname}</span> odrzucił zaproszenie do gry</span>
                    </div>
                    <div className='d-flex flex-row justify-content-start'>
                        <Tooltip title='Ok' placement='top'>
                            <IconButton aria-label='invite-accept' size='small' color='success' className='p-1'>
                                <DoneIcon fontSize='small'/>
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