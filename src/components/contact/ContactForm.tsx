"use client";

import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const services = [
  "Custom Software",
  "Enterprise / SaaS",
  "AI Solutions",
  "Cloud & DevOps",
  "Product Design",
  "Something else",
];

type FieldName = "name" | "email" | "company" | "phone" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+()\d][\d\s()-]{6,}$/;

/**
 * Contact form. Client-side only for now — custom validation (no native
 * browser validation) and a sonner toast on success. Wire the submit handler
 * to a backend / email service later.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<string>(services[0]);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (v: Values): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "Please enter your name.";
    if (!v.email.trim()) e.email = "Please enter your email.";
    else if (!emailRe.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (v.phone.trim() && !phoneRe.test(v.phone.trim()))
      e.phone = "Enter a valid phone number.";
    if (!v.message.trim()) e.message = "Tell us a little about your project.";
    else if (v.message.trim().length < 10)
      e.message = "A little more detail helps (min. 10 characters).";
    return e;
  };

  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    // TODO: connect to a route handler / email provider.
    toast.success("Message sent — we'll reply within one business day.");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check width={26} height={26} />
        </span>
        <h3 className="mt-6 heading-md">Thank you — message received.</h3>
        <p className="mt-3 max-w-sm text-sm text-muted">
          Our team will get back to you within one business day. In the meantime,
          feel free to explore our work.
        </p>
        <Button variant="outline" href="/case-studies" className="mt-6">
          View case studies
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          placeholder="Jane Doe"
          required
          value={values.name}
          error={errors.name}
          onChange={setField}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          required
          value={values.email}
          error={errors.email}
          onChange={setField}
        />
        <Field
          label="Company"
          name="company"
          placeholder="Company Inc."
          value={values.company}
          error={errors.company}
          onChange={setField}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 00000 00000"
          value={values.phone}
          error={errors.phone}
          onChange={setField}
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-ink">
          What can we help with?
        </label>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setInterest(s)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                interest === s
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-paper text-muted hover:border-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Tell us about your project
          <span className="text-brand"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={!!errors.message}
          placeholder="A few sentences on your goals, timeline and any constraints…"
          className={cn(
            "w-full resize-none rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70",
            errors.message
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              : "border-line focus:border-brand focus:ring-2 focus:ring-brand/15",
          )}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full sm:w-auto">
        Send message
      </Button>
      <p className="mt-4 text-xs text-muted">
        By submitting, you agree to our privacy policy. We never share your data.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  error,
  onChange,
}: {
  label: string;
  name: FieldName;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
            : "border-line focus:border-brand focus:ring-2 focus:ring-brand/15",
        )}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
