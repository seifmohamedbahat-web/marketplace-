// Sends form data to the agency inbox using Web3Forms (no activation step).

export const AGENCY_EMAIL = "seifmohamedbahat@gmail.com";
const WEB3FORMS_ACCESS_KEY = "55d91de2-0ffc-42c6-bc8e-cfd63d0d17bd";
const ENDPOINT = "https://api.web3forms.com/submit";

export type FormPayload = Record<string, string | number | boolean | string[] | null | undefined>;

export async function sendForm(subject: string, data: FormPayload): Promise<boolean> {
  const flat: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    from_name: "Avexa Website",
    to: AGENCY_EMAIL,
  };
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    flat[k] = Array.isArray(v) ? v.join(", ") : String(v);
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(flat),
    });
    return res.ok;
  } catch {
    return false;
  }
}