import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* TODO: Issue #3 - Build full landing page with neobrutalist design */}
        <h1 className="font-display text-[8rem] leading-none text-plague-black mb-4">
          PLAGUE
        </h1>
        <p className="font-mono text-lg border-3 border-plague-black p-4 shadow-brutal mb-8 bg-plague-yellow">
          On-chain social deduction. Zero-knowledge roles. Real stakes.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/lobby"
            className="btn-brutal bg-plague-red text-plague-white px-8 py-4 text-lg inline-block"
          >
            Enter Lobby
          </Link>
          <a
            href="https://github.com/yourusername/plague"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal bg-plague-white text-plague-black px-8 py-4 text-lg inline-block"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
