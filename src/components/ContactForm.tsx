import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    clubName: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mojpwzen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clubName: form.clubName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <section className="px-6 max-w-2xl mx-auto mt-16 text-center py-12">
        <div className="bg-navy-card border border-gold/30 rounded-2xl p-10">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="font-heading text-2xl font-bold text-gold">
            Thanks! We'll be in touch within 24 hours.
          </h2>
          <p className="text-white/60 mt-3">
            We'll walk you through exactly how this works for your club.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 max-w-2xl mx-auto mt-16">
      <div className="bg-navy-card border border-white/10 rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-bold text-gold text-center">
          Want to Make This Happen?
        </h2>
        <p className="text-white/60 text-center mt-2 mb-8">
          We'll walk you through exactly how this works for your club
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-1">
              Club Name *
            </label>
            <input
              type="text"
              required
              value={form.clubName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, clubName: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. St. Mary's GAA"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">
              Contact Name *
            </label>
            <input
              type="text"
              required
              value={form.contactName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, contactName: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="you@club.ie"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="083 123 4567"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-gold hover:bg-gold-light text-navy font-heading font-bold py-3 rounded-lg transition-colors text-lg cursor-pointer"
          >
            Get Started
          </button>
        </form>
      </div>
    </section>
  );
}
