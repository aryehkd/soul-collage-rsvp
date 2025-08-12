"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    attendees: 1,
    notes: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "attendees" ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    // very light validation
    if (!form.name.trim() || !form.email.trim()) {
      setStatus({ type: "error", message: "Please enter your name and email." });
      return;
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("RSVP failed");

      setStatus({ type: "success", message: "Thanks! Your RSVP has been received." });
      setForm({ name: "", email: "", phone: "", attendees: 1, notes: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 text-stone-900">
      {/* Header / Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-16 sm:pb-16 sm:pt-24">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium tracking-wide text-amber-800 shadow-sm">
              A journey to Healing, Community, Self‑Empowerment, and Fun
            </span>
            <h1 className="mt-6 font-serif text-5xl font-extrabold tracking-tight text-amber-900 sm:text-6xl">
              Soul Collage
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-700">
              Come explore the wisdom of your inner self. Soul Collage is a gentle, playful, and powerful process using images to access your intuition and connection with others in a soulful safe space.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <InfoChip label="Date" value="Sept. 12, 2025" />
              <InfoChip label="Time" value="1:00 pm – 4:00 pm" />
              <InfoChip label="Cost" value="$35 (all materials provided)" />
            </div>
          </div>
        </div>
      </section>

      {/* Details + RSVP */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-5">
        {/* Location Card */}
        <div className="md:col-span-2">
          <div className="h-full rounded-2xl bg-amber-200/50 p-6 shadow-sm ring-1 ring-amber-300/60">
            <h2 className="font-serif text-2xl font-bold text-amber-900">Location</h2>
            <p className="mt-3 text-stone-800">
              <span className="block font-medium">The Gathering Place</span>
              20255 Willamette Dr.,<br />
              West Linn, OR 97068
            </p>
            <a
              href="https://maps.apple.com/?q=20255+Willamette+Dr,+West+Linn,+OR+97068"
              className="mt-4 inline-flex items-center rounded-xl border border-amber-400 bg-white/60 px-4 py-2 text-sm font-medium text-amber-900 shadow-sm hover:bg-white"
            >
              Open in Maps
            </a>
            <Divider />
            <h3 className="font-serif text-xl font-semibold text-amber-900">Facilitator</h3>
            <p className="mt-2 text-stone-800">
              <span className="block font-medium">Gail Kempler</span>
              Licensed Acupuncturist, retired R.N.
            </p>
            <p className="mt-2 text-stone-700">
              Gail brings mindfulness, compassion, deep listening and meditation into each Soul Collage gathering.
            </p>
          </div>
        </div>

        {/* RSVP Card */}
        <div className="md:col-span-3">
          <div className="h-full rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-amber-300/60">
            <h2 className="font-serif text-2xl font-bold text-amber-900">RSVP</h2>
            <p className="mt-1 text-stone-700">Reserve your spot below!</p>

            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-stone-800" htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-stone-800" htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-stone-800" htmlFor="phone">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-stone-800" htmlFor="attendees"># Attendees</label>
                <input
                  id="attendees"
                  name="attendees"
                  type="number"
                  min={1}
                  max={10}
                  value={form.attendees}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-800" htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2 mt-2 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-700 px-5 py-3 text-base font-semibold text-amber-50 shadow hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:w-auto"
                >
                  RSVP Now
                </button>
                {status.type === "success" && (
                  <p className="text-sm font-medium text-green-700">{status.message}</p>
                )}
                {status.type === "error" && (
                  <p className="text-sm font-medium text-red-700">{status.message}</p>
                )}
              </div>
            </form>

            <Divider className="mt-8" />
            <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-stone-700">
              <li>All materials are provided.</li>
              <li>Please arrive a few minutes early to settle in.</li>
              <li>Wear comfortable clothing—this is a creative, playful workshop.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 pb-10 text-center text-sm text-stone-600">
        <p>&copy; {new Date().getFullYear()} Soul Collage Gathering • West Linn, OR</p>
      </footer>
    </main>
  );
}

function InfoChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-amber-300 bg-white/70 px-4 py-3 text-left shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">{label}</p>
      <p className="mt-0.5 font-medium text-stone-900">{value}</p>
    </div>
  );
}

function Divider({ className = "mt-6" }) {
  return <div className={`h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent ${className}`} />;
}
