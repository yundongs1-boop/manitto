"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  isOpen: boolean
  participantName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ isOpen, participantName, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-md w-full animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="text-center space-y-6">
          {/* Warning Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900">정말 확인하시겠습니까?</h2>

          {/* Message */}
          <div className="space-y-3 text-gray-600">
            <p className="font-semibold">
              당신은 진짜 <span className="text-[var(--primary-color)] font-bold">{participantName}</span>이 맞습니까?
            </p>
            <p className="text-sm leading-relaxed">
              당신 때문에 마니또 게임이
              <br />
              망쳐질 수 있습니다.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 h-12 rounded-2xl border-gray-300 hover:bg-gray-50 text-gray-700 font-medium bg-transparent"
            >
              아니에요
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-12 rounded-2xl bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-semibold"
            >
              네, 맞습니다
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
