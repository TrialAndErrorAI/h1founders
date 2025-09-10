import ComingSoon from '../../components/ComingSoon'

export default function Events() {
  return (
    <ComingSoon
      title="EVENTS"
      description="Weekly founder meetups, workshops, and networking events for the H1Founders community."
      features={[
        'Weekly founder office hours with successful immigrant entrepreneurs',
        'Virtual networking events by visa type and industry',
        'Legal workshops with immigration attorneys',
        'Investor pitch practice sessions',
        'Co-founder matching events for technical and business partners'
      ]}
      launchDate="Q1 2025"
      context="events"
    />
  )
}