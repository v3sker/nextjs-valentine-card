import ValentineCard from '@/components/ValentineCard'

export default function Home() {
  const secretCode = process.env.SECRET_CODE || 'LOVEYOU2026'
  const personName = process.env.PERSON_NAME || 'Your Special Someone'

  return (
    <ValentineCard secretCode={secretCode} personName={personName} />
  )
}
