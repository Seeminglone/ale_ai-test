interface FormData {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}

export const validateForm = (data: FormData): string[] => {
  const errors = [];

  if (!data.name) errors.push("Name is required.");
  if (!data.email.match(/^\S+@\S+\.\S+$/)) errors.push("Email must be valid.");
  if (data.assignment_description.length < 10)
    errors.push("Assignment description must be at least 10 characters.");
  if (!data.github_repo_url.match(/^https?:\/\/.+/))
    errors.push("GitHub URL must be valid.");
  if (!data.candidate_level) errors.push("Candidate level is required.");

  return errors;
};
