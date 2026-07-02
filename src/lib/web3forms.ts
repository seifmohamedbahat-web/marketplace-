export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
  | string
  | undefined;

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

export async function submitToWeb3Forms(
  fields: Record<string, string>
): Promise<Web3FormsResult> {
  if (!WEB3FORMS_ACCESS_KEY) {
    return {
      success: false,
      message:
        "Missing VITE_WEB3FORMS_ACCESS_KEY. Get a free key at web3forms.com and set it as an environment variable.",
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...fields,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, message: data.message ?? "Submitted." };
    }

    return { success: false, message: data.message ?? "Submission failed." };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}
