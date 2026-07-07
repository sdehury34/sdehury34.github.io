// Renders a string where **wrapped words** become highlighted spans.
export default function Highlight({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong className="hl" key={i}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}
