import Link from "next/link";

const TestButtons = () => {
  return (
    <div className="w-full flex justify-end space-x-4 mt-1 text-sm">
      <Link
        href="/edges/create"
        className="bg-primary text-primary-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Primary
      </Link>
      <Link
        href="/edges/create"
        className="bg-secondary text-secondary-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Secondary
      </Link>
      <Link
        href="/edges/create"
        className="bg-accent text-accent-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Accent
      </Link>
      <Link
        href="/edges/create"
        className="bg-neutral text-neutral-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Neutral
      </Link>
      <Link
        href="/edges/create"
        className="bg-info text-info-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Info
      </Link>
      <Link
        href="/edges/create"
        className="bg-success text-success-content 
            px-4 py-2 rounded hover:brightness-110 hover:shadow
            opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Success
      </Link>
      <Link
        href="/edges/create"
        className="bg-warning text-warning-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Warning
      </Link>
      <Link
        href="/edges/create"
        className="bg-error text-error-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
      >
        Error
      </Link>
    </div>
  );
};

export default TestButtons;
