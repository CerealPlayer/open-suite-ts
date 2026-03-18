import type { PropsWithChildren } from "react";

type NoticeProps = PropsWithChildren<{
  variant?: "info" | "error";
  className?: string;
}>;

const variantClassName: Record<NonNullable<NoticeProps["variant"]>, string> = {
  info: "border-indigo-200 bg-indigo-50 text-indigo-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
};

export function Notice({ variant = "info", className, children }: NoticeProps) {
  const classes = `rounded-lg border px-4 py-3 text-sm ${variantClassName[variant]}${
    className ? ` ${className}` : ""
  }`;

  return <div className={classes}>{children}</div>;
}
