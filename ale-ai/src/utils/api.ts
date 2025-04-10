export const fetchCandidateLevels = async (): Promise<string[]> => {
  const res = await fetch(
    "https://tools.qa.ale.ai/api/tools/candidates/levels"
  );
  if (!res.ok) throw new Error("Failed to fetch candidate levels.");
  const data = await res.json();
  return data.levels;
};

export const submitAssignment = async (formData: any): Promise<any> => {
  const res = await fetch(
    "https://tools.qa.ale.ai/api/tools/candidates/assignments",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};
