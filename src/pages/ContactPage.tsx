import { useState } from "react";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import useMetaData from "../hooks/useMetaData";
const ContactPage = () => {
  // environment variables
  const formEndpoint = import.meta.env.VITE_FORMSPREE_KEY;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, handleSubmit] = useForm(formEndpoint);
  useMetaData(
    "Contact Us",
    "Have feature suggestions for ReelVerse? Or want to talk about Full-Stack optimizations? Drop a message down into the console pipeline!",
  );

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-[#0d0d13] text-gray-100 pt-24 px-4 md:px-12 pb-12 flex items-center justify-center selection:bg-vibe-cyan/30">
        <div className="max-w-4xl w-full bg-white/1 border border-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/40 flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col justify-center items-center space-y-6">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Transmission <span className="text-vibe-cyan">Received</span>
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed text-center">
              Thanks for reaching out! Your message has successfully landed in
              our inbox. We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.submitting) {
    return (
      <div className="min-h-screen bg-[#0d0d13] text-gray-100 pt-24 px-4 md:px-12 pb-12 flex items-center justify-center selection:bg-vibe-cyan/30">
        <div className="max-w-4xl w-full bg-white/1 border border-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/40 flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col justify-center items-center space-y-6">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Processing <span className="text-vibe-cyan">Message...</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d13] text-gray-100 pt-24 px-4 md:px-12 pb-12 flex items-center justify-center selection:bg-vibe-cyan/30">
      <div className="max-w-4xl w-full bg-white/1 border border-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/40 flex flex-col md:flex-row gap-10">
        {/* Pitch Context */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Get In <span className="text-vibe-cyan">Touch</span>
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Have feature suggestions for ReelVerse 2.0? Or want to talk about
              Full-Stack optimizations? Drop a message down into the console
              pipeline!
            </p>
          </div>

          <div className="space-y-4 text-sm text-zinc-500 font-medium">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-vibe-cyan" />
              <span>support@reelverse.io</span>
            </div>
          </div>
        </div>

        {/* Input Form Module */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          <div className="relative">
            <label htmlFor="name">
              <span className="sr-only">Your Name</span>
            </label>
            <User className="absolute left-4 top-3.5 text-zinc-600 w-4 h-4" />
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-vibe-cyan rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all text-white placeholder-zinc-600"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="relative">
            <label htmlFor="email">
              <span className="sr-only">Your Email</span>
            </label>
            <Mail className="absolute left-4 top-3.5 text-zinc-600 w-4 h-4" />
            <input
              type="email"
              placeholder="Your Email Address"
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-vibe-cyan rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all text-white placeholder-zinc-600"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="relative">
            <label htmlFor="message">
              <span className="sr-only">Your Message</span>
            </label>
            <MessageSquare className="absolute left-4 top-4 text-zinc-600 w-4 h-4" />
            <textarea
              placeholder="Type your transmission here..."
              rows={4}
              required
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-vibe-cyan rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all text-white placeholder-zinc-600 resize-none"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-vibe-cyan text-vibe-cyan font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-vibe-cyan/5"
          >
            <Send size={14} /> Send Transmission
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
