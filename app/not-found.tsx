import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | ISDC",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center bg-gray-50 py-20 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 number */}
        <p className="text-9xl font-extrabold text-primary leading-none select-none">
          404
        </p>

        {/* Divider line */}
        <div className="w-16 h-1 bg-secondary mx-auto my-6 rounded-full" />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Head back to safety.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
