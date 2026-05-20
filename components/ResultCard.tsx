import { Card, CardContent } from "@/components/ui/card"

interface Participant {
  id: number
  name: string
  team: string
}

interface ResultCardProps {
  manitto: Participant
}

export default function ResultCard({ manitto }: ResultCardProps) {
  return (
    <Card className="rounded-2xl bg-[var(--pink200)] border-0 shadow-lg transform transition-all duration-500 ease-out">
      <CardContent className="p-8 text-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-[var(--grey400)]">당신의 마니또는</h3>
            <div className="bg-[var(--white)] rounded-2xl p-6 shadow-sm">
              <p className="text-3xl font-bold text-[var(--black)] mb-2">{manitto.name}</p>
              <div className="inline-flex items-center px-4 py-2 bg-[var(--grey200)] rounded-full">
                <span className="text-sm font-medium text-[var(--grey100)]">{manitto.team}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
