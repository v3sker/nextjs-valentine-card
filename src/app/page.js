import ValentineCard from '@/components/ValentineCard'

export default function Home() {
  const secretCode = process.env.SECRET_CODE || 'ЛЮБОВЬ2026'
  const personName = process.env.PERSON_NAME || 'Твой особенный человек'

  return (
    <ValentineCard secretCode={secretCode} personName={personName} />
  )
}
