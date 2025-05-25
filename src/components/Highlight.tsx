interface HighlightProps {
  text: string
  query: string
}

export const Highlight = ({ text, query }: HighlightProps) => {
  if (!query) return <>{text}</>

  const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')

  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, idx) =>
        regex.test(part) ? (
          <mark key={idx} className="bg-yellow-600/20">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
