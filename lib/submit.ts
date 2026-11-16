export interface RegistrationData {
  name: string;
  department: "CSE" | "CSD";
  year: "1st Year";
  food: "Veg" | "Non-Veg";
}

export async function submitRegistration(
  data: RegistrationData
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}
