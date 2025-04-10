import AssignmentForm from "@/components/Form";

export default function HomePage() {
  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Assignment Submission</h1>
      <AssignmentForm />
    </div>
  );
}
