// @/components/footer/Index.tsx

// Utility
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="w-full border-t border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between px-4 py-6 md:flex-row">
          <p className="cursor-default text-sm font-light">
            &copy; {new Date().getFullYear()} ADRDE IT Management System. All
            rights reserved.
          </p>

          <div className="mt-0 flex gap-4">
            <div className="transition-all duration-200 hover:text-xl hover:text-blue-500">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>

            <div className="transition-all duration-200 hover:text-xl hover:text-blue-500">
              <Link href="/terms-of-service">Terms of Service</Link>
            </div>
            <div className="transition-all duration-200 hover:text-xl hover:text-blue-500">
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
