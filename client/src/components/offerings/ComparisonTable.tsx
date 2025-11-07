export default function ComparisonTable() {
  const tiers = [
    {
      name: 'Pathfinder',
      stage: 'Visa confusion, clarity needed',
      format: '1:1 sessions',
      price: '$297/session'
    },
    {
      name: 'Launch Club',
      stage: 'Ideation, haven\'t started',
      format: 'Group (5-10)',
      price: '$197 one-time'
    },
    {
      name: 'Revenue Club',
      stage: 'Built, no customers yet',
      format: 'Group (5 max)',
      price: '$297/mo'
    },
    {
      name: 'WIN CLUB',
      stage: 'Running but stuck',
      format: 'Elite (5 max)',
      price: '$497/mo (3 months)',
      elite: true
    }
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-mono text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-accent">Tier</th>
            <th className="text-left py-3 px-4 text-accent">Stage</th>
            <th className="text-left py-3 px-4 text-accent">Format</th>
            <th className="text-left py-3 px-4 text-accent">Price</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr
              key={tier.name}
              className={`border-b border-border/50 hover:bg-background-secondary/30 transition-colors ${
                tier.elite ? 'bg-accent/5' : ''
              }`}
            >
              <td className="py-3 px-4 text-foreground font-semibold">
                {tier.name}
              </td>
              <td className="py-3 px-4 text-foreground-secondary">
                {tier.stage}
              </td>
              <td className="py-3 px-4 text-foreground-secondary">
                {tier.format}
              </td>
              <td className="py-3 px-4 text-foreground">
                {tier.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
