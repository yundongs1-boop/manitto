"use client"

import { useState, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PARTICIPANTS } from "@/lib/participants"
import { getManittoAssignment } from "@/lib/matching"
import ResultCard from "./ResultCard"
import ConfirmDialog from "./ConfirmDialog"

export default function ManittoForm() {
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const assignedManitto = useMemo(() => {
    if (!selectedParticipantId) return null
    return getManittoAssignment(selectedParticipantId)
  }, [selectedParticipantId])

  const handleCheckManitto = () => {
    if (selectedParticipantId && assignedManitto) {
      setShowConfirmDialog(true)
    }
  }

  const handleConfirm = () => {
    setShowConfirmDialog(false)
    setShowResult(true)
  }

  const handleCancel = () => {
    setShowConfirmDialog(false)
  }

  const handleReset = () => {
    setSelectedParticipantId(null)
    setShowResult(false)
  }

  const selectedParticipant = selectedParticipantId ? PARTICIPANTS.find((p) => p.id === selectedParticipantId) : null

  return (
    <>
      <Card className="rounded-2xl shadow-lg border-0 bg-[var(--white)]">
        <CardContent className="p-8">
          {!showResult ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <label htmlFor="participant-select" className="block text-sm font-semibold text-[var(--grey400)] mb-3">
                  참가자 선택
                </label>
                <Select
                  value={selectedParticipantId?.toString() || ""}
                  onValueChange={(value) => setSelectedParticipantId(Number(value))}
                >
                  <SelectTrigger
                    id="participant-select"
                    className="w-full h-14 rounded-2xl border-[var(--grey200)] bg-[var(--grey200)] hover:bg-[var(--white)] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--pink200)] transition-all duration-200 text-base"
                  >
                    <SelectValue placeholder="이름을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-[var(--grey200)] shadow-xl">
                    {PARTICIPANTS.map((participant) => (
                      <SelectItem
                        key={participant.id}
                        value={participant.id.toString()}
                        className="rounded-xl py-3 px-4 text-base hover:bg-[var(--pink200)] focus:bg-[var(--pink200)]"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-[var(--black)]">{participant.name}</span>
                          <span className="text-sm text-[var(--grey100)] ml-2">({participant.team})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCheckManitto}
                disabled={!selectedParticipantId}
                className="w-full h-14 rounded-2xl bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 disabled:bg-[var(--disabled)] disabled:text-[var(--white)] text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {selectedParticipantId ? "마니또 확인하기" : "참가자를 선택해주세요"}
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <ResultCard manitto={assignedManitto!} />
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        participantName={selectedParticipant?.name || ""}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
