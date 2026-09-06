"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs as defaultFaqs, type Faq } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export default function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Answers to the questions we hear most.",
  description = "Something not covered here? Our team is glad to talk specifics.",
  tone = "paper",
}: {
  items?: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Alternate background so the section can sit next to other paper sections. */
  tone?: "paper" | "sand";
}) {
  const list = items ?? defaultFaqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className={cn("section", tone === "sand" ? "bg-sand" : "bg-paper")}
      id="faq"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="divide-y divide-line border-y border-line">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="heading-md text-fg">
                    {f.question}
                  </span>
                  <span
                    className={cn(
                      "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line transition-colors",
                      isOpen && "border-brand bg-brand text-ink",
                    )}
                  >
                    <span className="absolute h-2.5 w-px bg-current transition-transform" style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }} />
                    <span className="h-px w-2.5 bg-current" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="body pb-5 pr-10 leading-relaxed text-muted">
                        {f.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
