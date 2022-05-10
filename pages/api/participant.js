const orgId = process.env.DYTE_ORG_ID;
const baseUrl = process.env.DYTE_BASE_URL;
const apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const meetingId = body.meetingId;
  const randId = Math.random().toString(36).substring(7);
  const reqBody = {
    clientSpecificId: randId,
    userDetails: {
      name: `user-${randId}`,
    },
  };
  const joinMeetingResp = await fetch(
    `${baseUrl}/organizations/${orgId}/meetings/${meetingId}/participant`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `APIKEY ${apiKey}`,
      },
      body: JSON.stringify(reqBody),
    }
  );
  const joinMeeting = await joinMeetingResp.json();
  res.status(200).json({ auth: joinMeeting.data.authResponse.authToken });
};
