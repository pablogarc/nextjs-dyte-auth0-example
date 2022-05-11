import React from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';

function Test() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
  
    const [meetings, setMeetings] = useState([]);
  
    const getAllMeetings = async () => {
      const meetingsResp = await fetch("/api/meetings");
      const { meetings } = await meetingsResp.json();
      setMeetings(meetings);
    };
  
    useEffect(() => {
      getAllMeetings();
    }, []);
  
    if(isLoading) return <div>...loading</div>
    if(error) return <div>{error.message}</div>

    return (
        <>
        <div>
          <div className={styles.title}>
            Welcome {user.name}
          </div>
          {meetings.map((meeting) => (
            <div className={styles.meetingContainer} key={meeting.roomName}>
              <div className={styles.meetingsList}>
                {meeting.title ? meeting.title : meeting.roomName}
              </div>
              <button className={styles.meetingsList} onClick={() => 
                router.push(`/meeting/${meeting.id}/room/${meeting.roomName}`)}>
                Join
              </button>
            </div>
          ))}
        </div>
        <div>
          <button className={styles.logout} onClick={() => 
            router.push('/api/auth/logout')}>
            Logout
          </button>
        </div>
      </>
    )
}

export default Test

export const getServerSideProps = withPageAuthRequired();