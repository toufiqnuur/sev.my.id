import Link from "next/link";

export default function ExpiredView() {
  return (
    <>
      <main>
        <div className="container">
          <div className="mt-32 flex flex-col items-center justify-center">
            <h1 className="font-heading text-center text-4xl text-white">
              This link has expired
            </h1>
            <p className="mt-4 text-center text-white/72">
              The link you are trying to access has expired. Please contact the
              person who shared the link with you.
            </p>
            <Link
              href="/"
              className="sv-mask-c-full font-heading mt-8 bg-linear-to-t from-blue-900 to-blue-700 px-4 py-2 text-white"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
