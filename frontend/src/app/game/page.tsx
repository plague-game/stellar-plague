// TODO: Issue #10 - Build game board UI
// TODO: Issue #11 - Round timer component
// TODO: Issue #12 - Vote panel component
// TODO: Issue #13 - Infection animation

export default function GamePage({ params }: { params: { roomId: string } }) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="font-display text-6xl mb-4">ROUND 1</h1>
      {/* Game board, player tokens, vote UI go here */}
      <p className="font-mono opacity-50">[Game UI — see GitHub issues #10–#18]</p>
    </div>
  )
}
