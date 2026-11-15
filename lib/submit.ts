export interface RegistrationData {
  name: string;
  regNo: string;
  department: "CSE" | "CSD";
  year: "1st Year";
  food: "Veg" | "Non-Veg";
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  id: string;
}

/**
 * Submits registration data to Google Sheets via Google Apps Script Web App.
 */
export async function submitRegistration(
  data: RegistrationData
): Promise<SubmissionResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_SCRIPT_URL;

  if (!scriptUrl) {
    throw new Error("NEXT_PUBLIC_SCRIPT_URL is not configured.");
  }

  const payload = {
    name: data.name,
    regNo: data.regNo,
    department: data.department,
    year: data.year,
    food: data.food,
  };

  try {
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Network error submitting registration:", error);
    throw error;
  }

  // Backup in localStorage if in client environment
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        localStorage.getItem("aagman_registrations") || "[]"
      );
      existing.push({
        ...payload,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("aagman_registrations", JSON.stringify(existing));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  const generatedId = `AGM-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    success: true,
    message: "Registration successful! Welcome to the college family.",
    id: generatedId,
  };
}
