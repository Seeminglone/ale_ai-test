export const fetchCandidateLevels = async (): Promise<string[]> => {
  const res = await fetch("https://tools.qa.ale.ai/api/tools/candidates/levels");

  if (!res.ok) {
    throw new Error("Failed to fetch candidate levels.");
  }

  const data: { levels: string[] } = await res.json();
  return data.levels;
};

export const submitAssignment = async (
  formData: Record<string, string>
): Promise<{ message: string }> => {
  const res = await fetch("https://tools.qa.ale.ai/api/tools/candidates/assignments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as { message: string; errors?: string[] };
  }

  return data as { message: string };
};
