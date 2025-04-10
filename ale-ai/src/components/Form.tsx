"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCandidateLevels, submitAssignment } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { validateForm } from "@/utils/validation";

const initialForm = {
  name: "",
  email: "",
  assignment_description: "",
  github_repo_url: "",
  candidate_level: "",
};

export default function AssignmentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: levels = [] } = useQuery({
    queryKey: ["candidateLevels"],
    queryFn: fetchCandidateLevels,
    staleTime: 1000 * 60 * 10, 
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const validationErrors = validateForm(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await submitAssignment(formData);
      router.push("/thank-you");
    } catch (err: any) {
      setErrors(err.errors || ["Submission failed."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>• {err}</li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-black p-2 rounded text-black placeholder-gray"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-black p-2 rounded text-black placeholder-gray"
      />
      <textarea
        name="assignment_description"
        placeholder="Assignment Description"
        value={formData.assignment_description}
        onChange={handleChange}
        className="w-full border border-black p-2 rounded min-h-[100px] text-black placeholder-gray"
      />
      <input
        type="url"
        name="github_repo_url"
        placeholder="GitHub Repository URL"
        value={formData.github_repo_url}
        onChange={handleChange}
        className="w-full border border-black p-2 rounded text-black placeholder-gray"
      />
      <select
        name="candidate_level"
        value={formData.candidate_level}
        onChange={handleChange}
       className="w-full border border-black p-2 rounded text-black placeholder-gray"
      >
        <option value="">Select a level</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit Assignment"}
      </button>
    </form>
  );
}
