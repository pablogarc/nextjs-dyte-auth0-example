const orgId = process.env.DYTE_ORG_ID;
const baseUrl = process.env.DYTE_BASE_URL;
const apiKey = process.env.DYTE_API_KEY;

export default async (req, res) => {
  const allMeetingsResp = await fetch(`${baseUrl}/organizations/${orgId}/meetings`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `APIKEY ${apiKey}`,
    },
  });
  const allMeetings = await allMeetingsResp.json()
  res.status(200).json({ meetings: allMeetings.data.meetings });
};
