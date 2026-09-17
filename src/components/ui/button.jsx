import React from "react";

export function Button({
  children,
  className = "",
  variant,
  size,
  type = "button",
  ...props
}) {
  const sizeClass =
      size === "icon"
          ? "inline-flex h-10 w-10 items-center justify-center"
          : "inline-flex items-center justify-center px-4 py-2";

  return (
      <button
          type={type}
          className={`${sizeClass} ${className}`}
          {...props}
      >
        {children}
      </button>
  );
}