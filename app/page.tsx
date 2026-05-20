import ManittoForm from "@/components/ManittoForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F8FA] font-sans">
      {/* Header */}
      <header className="text-center pt-12 pb-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/lgu-logo.png" alt="LG U+" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-[#141414] mb-3 tracking-tight">2026 lunchday 마니또</h1>
          <p className="text-[#787878] text-base leading-relaxed">
            내 이름을 선택하고
            <br />
            마니또를 확인해보세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-sm mx-auto px-4 pb-8">
        <ManittoForm />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="text-xs text-[#ABABAB]">공정한 추첨을 위해 시드 기반 매칭을 사용합니다</p>
      </footer>
    </div>
  )
}
