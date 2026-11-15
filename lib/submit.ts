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
 * Simulates registration submission with a 1.5s delay.
 * Ready for Google Sheets / API integration.
 */
export async function submitRegistration(
  data: RegistrationData
): Promise<SubmissionResponse> {
  console.log("Submitting AAGMAN 2K26 Registration:", data);

  // Simulate network latency (1.5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Backup in localStorage if in client environment
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        localStorage.getItem("aagman_registrations") || "[]"
      );
      existing.push({
        ...data,
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

