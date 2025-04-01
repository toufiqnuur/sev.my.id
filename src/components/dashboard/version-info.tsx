"use client";

export default function VersionInfo() {
  return (
    <div className="text-muted-foreground text-xs">
      <p>
        v{process.env.NEXT_PUBLIC_VERSION}-{process.env.NEXT_PUBLIC_GIT_COMMIT}
      </p>
    </div>
  );
}
