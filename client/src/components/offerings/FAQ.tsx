export default function FAQ() {
  const faqs = [
    {
      question: 'Is the community really free?',
      answer: 'Yes. Always. 900+ immigrant founders in WhatsApp groups. No paywall. I started this to find like-minded people. Coaching tiers exist for structured support. Community is the foundation. Coaching is optional.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Pathfinder, Launch Club, Revenue Club: Yes, cancel anytime. WIN CLUB Premium: 3-month commitment (transformation takes time).'
    },
    {
      question: 'What\'s "founding member" rate?',
      answer: 'Lock in rate forever. If I raise prices to $397 next year, you keep paying $297. Not temporary. True founding member benefit.'
    },
    {
      question: 'Why only 5 spots for WIN CLUB?',
      answer: "Real capacity constraint. Twice weekly 1.5-hour sessions = 15 hours/month. Can't dilute quality. 5 founders = sustainable for W2 (40 hrs) + WIN CLUB (15 hrs)."
    },
    {
      question: "What if I'm not sure which tier?",
      answer: "DM me. I'll tell you what fits your situation. No pressure, no hard sell. Just honest assessment."
    }
  ]

  return (
    <div className="space-y-6">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="bg-background-secondary/50 border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-accent mb-3 font-mono">
            {faq.question}
          </h3>
          <p className="text-foreground-secondary">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  )
}
