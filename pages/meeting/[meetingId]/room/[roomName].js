import { useState } from "react";
import { DyteMeeting } from "dyte-client";
import { useRouter } from "next/router";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Meeting() {
  const router = useRouter();
  const [auth, setAuth] = useState();
  const meetingId = router.query.meetingId;
  const roomName = router.query.roomName;

  const onDyteInit = (meeting) => {
    //meeting ended event
    meeting.on(meeting.Events.meetingEnded, () => {
      router.push("/test");
    });
  };

  const joinAsParticipant = async () => {
    const joinAsParticipantResp = await fetch("/api/participant", {
      method: "POST",
      body: JSON.stringify({
        meetingId: meetingId,
      }),
    });
    const { auth } = await joinAsParticipantResp.json();
    setAuth(auth);
  };


  if (!auth) {
    joinAsParticipant();
  }

  return (
    <>
      {auth && (
        <DyteMeeting
          onInit={onDyteInit}
          clientId={process.env.DYTE_ORG_ID}
          meetingConfig={{
            roomName: roomName,
            authToken: auth,
            apiBase: process.env.DYTE_BASE_URL,
          }}
        />
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();