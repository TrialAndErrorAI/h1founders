interface TierCardProps {
  title: string
  subtitle: string
  price: string
  retailPrice?: string
  description: string
  features: string[]
  format: string
  details: { label: string; value: string }[]
  elite?: boolean
}

export default function TierCard({
  title,
  subtitle,
  price,
  retailPrice,
  description,
  features,
  format,
  details,
  elite = false
}: TierCardProps) {
  return (
    <div
      className={`bg-background-secondary/50 border rounded-lg p-6 hover:border-accent/50 transition-colors ${
        elite ? 'border-accent' : 'border-border'
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        {elite && (
          <div className="inline-block bg-accent/20 border border-accent px-3 py-1 rounded text-xs font-mono text-accent mb-3">
            ELITE
          </div>
        )}
        <h3 className="text-2xl font-bold terminal-text matrix-glow mb-1">
          {title}
        </h3>
        <p className="text-sm text-foreground-secondary font-mono">
          {subtitle}
        </p>
      </div>

      {/* Pricing */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          {retailPrice && (
            <span className="text-foreground-tertiary line-through text-sm font-mono">
              {retailPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-accent font-mono">
            {price}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-foreground-secondary mb-4">
        {description}
      </p>

      {/* Features */}
      <div className="mb-4">
        <div className="text-sm font-mono text-foreground-secondary space-y-2">
          {features.map((feature, idx) => (
            <div key={idx}>• {feature}</div>
          ))}
        </div>
      </div>

      {/* Format */}
      <div className="pt-4 border-t border-border">
        <div className="text-sm text-foreground-secondary mb-3">
          <span className="font-mono text-accent">Format:</span> {format}
        </div>

        {/* Details */}
        <div className="space-y-1 text-sm text-foreground-secondary">
          {details.map((detail, idx) => (
            <div key={idx} className="font-mono">
              <span className="text-foreground-tertiary">{detail.label}:</span>{' '}
              {detail.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
