import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

function Label({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {label}
      {required && <span className="text-brand"> *</span>}
    </label>
  );
}

/** Labelled text input with validation state. Styles come from `.field`. */
export function Field({
  label,
  name,
  required,
  error,
  hint,
  className,
  ...rest
}: BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  return (
    <div className={className}>
      <Label htmlFor={name} label={label} required={required} />
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn("field", error && "field-invalid")}
        {...rest}
      />
      {error ? (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}

/** Labelled textarea with validation state. */
export function TextArea({
  label,
  name,
  required,
  error,
  hint,
  className,
  rows = 5,
  ...rest
}: BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  return (
    <div className={className}>
      <Label htmlFor={name} label={label} required={required} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn("field resize-none", error && "field-invalid")}
        {...rest}
      />
      {error ? (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}
