"use client";

import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Card, { cardClasses } from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import { Field, TextArea } from "@/components/ui/Field";
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
      <Card padding="lg" className="flex flex-col items-center text-center">
        <IconChip tone="brand" size="lg">
          <Check width={26} height={26} />
        </IconChip>
        <h3 className="heading-md mt-6">Thank you — message received.</h3>
        <p className="body-sm mt-3 max-w-sm">
          Our team will get back to you within one business day. In the meantime,
          feel free to explore our work.
        </p>
        <Button variant="outline" href="/case-studies" className="mt-6">
          View case studies
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cardClasses({ padding: "lg" })}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(e) => setField("name", e.target.value)}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => setField("email", e.target.value)}
        />
        <Field
          label="Company"
          name="company"
          placeholder="Company Inc."
          autoComplete="organization"
          value={values.company}
          error={errors.company}
          onChange={(e) => setField("company", e.target.value)}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 00000 00000"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <span className="field-label">What can we help with?</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Area of interest">
          {services.map((s) => {
            const on = interest === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setInterest(s)}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  on
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-paper text-muted hover:border-fg hover:text-fg",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <TextArea
        className="mt-5"
        label="Tell us about your project"
        name="message"
        required
        rows={5}
        value={values.message}
        error={errors.message}
        onChange={(e) => setField("message", e.target.value)}
        placeholder="A few sentences on your goals, timeline and any constraints…"
      />

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full sm:w-auto">
        Send message
      </Button>
      <p className="mt-4 text-xs text-muted">
        By submitting, you agree to our privacy policy. We never share your data.
      </p>
    </form>
  );
}
