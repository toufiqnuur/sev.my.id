"use client";

import { useRef, useState } from "react";
import { IoQrCodeSharp, IoRocket, IoWarning } from "react-icons/io5";
import { z } from "zod";
import { copyShorten, shortUrl } from "@/lib/copy";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Links } from "@prisma/client";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const urlSchema = z.string().url();

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<Links | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    try {
      urlSchema.parse(value);
      setError("");
    } catch {
      setError("Input must be a valid link");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error || !inputValue.trim()) {
      setError("Please provide a valid link before submitting");
      return;
    }

    try {
      const response = await fetch(`/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten the URL");
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetForm = () => {
    setInputValue("");
    setError("");
    setData(null);
  };

  const handleCopyToClipboard = () => {
    if (data?.short_url) {
      copyShorten(data.short_url);
      toast.success("Link copied to clipboard", {
        duration: 3000,
      });
    }
  };

  const handleDownloadQRCode = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `qr-${data?.short_url}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="container bg-no-repeat py-16 max-md:bg-[auto_500px] max-md:bg-center md:bg-[url('/hero.png')] md:bg-contain md:bg-right">
      <div className="md:max-w-sm lg:max-w-3xl">
        <h1 className="font-heading text-4xl font-black text-amber-50 uppercase lg:text-7xl">
          Make it short make it simple
        </h1>
        <p className="mt-4 text-xl text-white/72">
          Shorten, track, and share your links with our all-in-one URL
          shortener.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="sv-mask-c-tlbr mt-8 max-w-lg bg-white/8 drop-shadow-[0px_16px_64px_rgba(2,132,199,1)] backdrop-blur-3xl">
            <input
              type="text"
              className="font-heading w-full p-4 text-white/72 focus:outline-0"
              placeholder="> Paste your link here..."
              value={data?.short_url ? shortUrl(data.short_url) : inputValue}
              onChange={handleInputChange}
              disabled={!!data}
            />
            <div
              className={`flex min-h-1 items-center gap-2 text-white ${
                error ? "bg-red-700 p-2" : "sv-warning-pattern"
              }`}
            >
              {error && (
                <>
                  <IoWarning />
                  <span>{error}</span>
                </>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {data && (
              <>
                <button
                  className="font-heading sv-mask-c-full cursor-pointer bg-white/48 px-5 py-3.5 text-white"
                  onClick={handleCopyToClipboard}
                  type="button"
                >
                  Copy to clipboard
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="sv-mask-c-full cursor-pointer bg-white/48 p-3.5 text-white"
                      type="button"
                    >
                      <IoQrCodeSharp size={24} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Your links is ready</DialogTitle>
                      <div className="mt-6">
                        <QRCodeCanvas
                          ref={canvasRef}
                          value={shortUrl(data.short_url ?? "")}
                          size={192}
                          imageSettings={{
                            src: "/sev.svg",
                            width: 32,
                            height: 32,
                            excavate: true,
                          }}
                          className="mx-auto"
                        />

                        <div className="font-heading mt-2 px-4 py-2 text-center">
                          {shortUrl(data.short_url ?? "")}
                        </div>
                        <button
                          className="sv-mask-c-full mx-auto mt-4 block cursor-pointer bg-black/90 px-4 py-2 text-xs font-semibold text-white"
                          onClick={handleDownloadQRCode}
                        >
                          Download QR Code
                        </button>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <button
                  className="font-heading sv-mask-c-full cursor-pointer bg-red-500/48 px-5 py-3.5 text-white"
                  onClick={handleResetForm}
                  type="button"
                >
                  Clear
                </button>
              </>
            )}
            {!data && (
              <button
                className="sv-mask-c-full flex cursor-pointer items-center gap-3 bg-linear-to-t from-blue-900 to-blue-700 px-5 py-3.5 font-bold text-white"
                type="submit"
              >
                <IoRocket />
                <span className="font-heading">Shorten</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
