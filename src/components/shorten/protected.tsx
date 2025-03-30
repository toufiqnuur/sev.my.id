"use client";

import { redirect } from "next/navigation";
import { useActionState } from "react";
import { ActionResponse } from "@/types/Protected";

interface ProtectedViewProps {
  submitAction: (
    prevState: ActionResponse,
    formData: FormData,
  ) => Promise<ActionResponse>;
}

const initialState: ActionResponse = {
  success: false,
  message: "",
  data: null,
};

export default function ProtectedView({ submitAction }: ProtectedViewProps) {
  const [state, action, isPending] = useActionState(submitAction, initialState);

  if (state.data) {
    return redirect(state.data);
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="mt-32 flex flex-col items-center justify-center">
            <h1 className="font-heading text-center text-4xl text-white">
              This link is password protected
            </h1>
            <p className="mt-4 text-center text-white/72">
              Please enter the password to continue
            </p>
            <form className="mt-8 w-full max-w-md" action={action}>
              <div className="sv-mask-c-tlbr w-full bg-white/8">
                <input
                  name="password"
                  type="password"
                  className="font-heading w-full p-4 text-white/72 focus:outline-0"
                  placeholder="> Type secret key here..."
                />
                <div
                  className={`sv-warning-pattern relative min-h-1 w-full ${state.message && "py-2"}`}
                >
                  {state.message && (
                    <span className="font-heading block bg-[yellow] px-3 py-2 text-center font-semibold uppercase">
                      {state.message}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="sv-mask-c-full mt-4 cursor-pointer bg-linear-to-t from-blue-900 to-blue-700 px-5 py-3.5 text-center font-bold text-white"
                type="submit"
                disabled={isPending}
              >
                <span className="font-heading uppercase">Continue</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
