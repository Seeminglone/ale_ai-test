import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-black">
        Thank you for submitting your assignment!
      </h1>

      <p className="mb-6 text-gray-600">
        We’ve received your submission and will review it shortly.
      </p>

      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to submission form
      </Link>
    </div>
  );
}