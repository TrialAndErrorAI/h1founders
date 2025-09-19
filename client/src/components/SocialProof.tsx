export default function SocialProof() {
  return (
    <div className="bg-background py-8 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 text-center sm:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-2">
            <dt className="text-base leading-7 text-foreground-tertiary">WhatsApp Members</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">781</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-2">
            <dt className="text-base leading-7 text-foreground-tertiary">Substack Subscribers</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">648+</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-2">
            <dt className="text-base leading-7 text-foreground-tertiary">Email Open Rate</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">50%</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}