export default function Partners() {
  const partners = [
    {
      tier: 'ARCHITECT',
      name: 'Manifest Labs PLLC',
      module: 'Legal Module',
      description: 'Your exclusive EB-1A partner - manifest your green card',
      services: ['EB-1A Applications', 'O-1 Visas', 'EB-2 NIW', 'Startup Legal Strategy'],
      contact: 'Schedule Consultation',
      url: 'https://calendly.com/manifestlabs',
      color: 'text-red-pill',
      glow: 'shadow-red-400/50'
    },
    // Future partners will be added here
    {
      tier: 'NEO',
      name: 'FinStackk',
      module: 'Tax & Accounting Module',
      description: 'SOC 2 compliant accounting for H1B founders',
      services: ['R&D Tax Credits', 'Startup Accounting', 'Tax Strategy', 'SOC 2 Compliance'],
      contact: 'Schedule Discovery Call',
      url: 'https://calendly.com/finstackk',
      color: 'text-accent',
      glow: 'shadow-green-400/50'
    },
    {
      tier: 'COMING SOON',
      name: 'Accounting Partner',
      module: 'Tax Module',
      description: 'Optimize for freedom - strategic tax planning',
      services: ['Tax Strategy', 'R&D Credits', 'State Selection', 'International Tax'],
      contact: 'Coming Q1 2025',
      url: '#',
      color: 'text-foreground-tertiary',
      glow: ''
    }
  ]

  const sponsorshipTiers = [
    {
      name: 'Blue Pill Sponsor',
      price: '$1K',
      period: '/month',
      benefits: [
        'Logo on partners page',
        'Quarterly newsletter mention',
        'Community slack access'
      ],
      color: 'border-blue-400',
      available: 10
    },
    {
      name: 'Red Pill Partner',
      price: '$5K',
      period: '/month',
      benefits: [
        'Terminal banner rotation',
        'Forum verified badge',
        'Monthly office hours',
        'Email newsletter feature'
      ],
      color: 'border-red-400',
      available: 5
    },
    {
      name: 'Neo Partner',
      price: '$10K',
      period: '/month',
      benefits: [
        'Tool sponsorship',
        'Event hosting rights',
        'Weekly forum presence',
        'Success story features',
        'Member directory premium badge'
      ],
      color: 'border-accent',
      available: 3
    },
    {
      name: 'Architect Alliance',
      price: '$25K',
      period: '/month',
      benefits: [
        'Primary banner placement',
        'All tool sponsorships',
        'Unlimited events',
        'Direct member access',
        'Co-branded content',
        'Exclusive partner status'
      ],
      color: 'border-purple-400',
      available: 1
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold terminal-text matrix-glow mb-4">
            THE ARCHITECT'S ALLIANCE
          </h1>
          <div className="font-mono text-foreground-tertiary space-y-2">
            <p>// Trusted nodes in the freedom network</p>
            <p>// Partners who actually help you escape the Matrix</p>
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-accent mb-8 font-mono">
            SYSTEM RESOURCES
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className={`bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 ${partner.glow ? `shadow-lg ${partner.glow}` : ''}`}
              >
                <div className={`text-xs font-mono ${partner.color} mb-2`}>
                  [{partner.tier}]
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-foreground-tertiary font-mono mb-3">
                  {partner.module}
                </p>
                <p className="text-foreground-secondary mb-4">
                  {partner.description}
                </p>
                <div className="space-y-1 mb-4">
                  {partner.services.map((service, sIdx) => (
                    <div key={sIdx} className="text-sm text-foreground-tertiary font-mono">
                      &gt; {service}
                    </div>
                  ))}
                </div>
                <a
                  href={partner.url}
                  className={`inline-block px-4 py-2 border rounded font-mono text-sm transition-all duration-200 ${
                    partner.tier === 'ARCHITECT'
                      ? 'border-red-400 text-red-pill hover:bg-red-400 hover:text-foreground'
                      : 'border-border text-foreground-tertiary cursor-not-allowed'
                  }`}
                >
                  {partner.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-accent mb-8 font-mono">
            BECOME A PARTNER
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sponsorshipTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-background-secondary/50 border-2 ${tier.color} rounded-lg p-6 hover:shadow-lg transition-all duration-300`}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-accent">
                    {tier.price}
                  </span>
                  <span className="text-foreground-tertiary ml-1">{tier.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="text-sm text-foreground-secondary font-mono">
                      ✓ {benefit}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-foreground-tertiary font-mono">
                  {tier.available} slots available
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Partner Section */}
        <div className="bg-background-secondary/50 border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-accent mb-4 font-mono">
            WHY PARTNER WITH H1FOUNDERS?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-foreground-tertiary font-mono">Active Founders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">$50M+</div>
              <div className="text-foreground-tertiary font-mono">Combined ARR</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-foreground-tertiary font-mono">High-Intent Audience</div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-foreground-secondary mb-6">
              Our members are actively building companies, raising funds, and need your services.
              This isn't advertising - it's joining a movement.
            </p>
            <a
              href="mailto:partners@h1founders.com"
              className="inline-block px-8 py-3 bg-green-400 text-foreground font-mono font-bold rounded hover:bg-accent transition-colors"
            >
              become_partner()
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}