import { useMemo, useRef } from 'react'
import { useFileStore } from '@renderer/store/file.store'
import { tokenize, type TokenType } from '@renderer/lib/tokenizer'

const COLORS: Record<TokenType, string> = {
  comment: 'text-zinc-500 italic',
  string: 'text-emerald-400',
  number: 'text-orange-400',
  keyword: 'text-purple-400',
  function: 'text-sky-400',
  plain: 'text-editor-text'
}

export default function CodeEditor(): React.JSX.Element {
  const content = useFileStore((s) => s.content)
  const setContent = useFileStore((s) => s.setContent)

  const gutterRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  const tokens = useMemo(() => tokenize(content), [content])
  const lineCount = content.split('\n').length

  function handleScroll(e: React.UIEvent<HTMLTextAreaElement>): void {
    const { scrollTop, scrollLeft } = e.currentTarget
    if (gutterRef.current) gutterRef.current.scrollTop = scrollTop
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop
      preRef.current.scrollLeft = scrollLeft
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key !== 'Tab') return
    e.preventDefault()

    const el = e.currentTarget
    const start = el.selectionStart
    const end = el.selectionEnd

    setContent(content.slice(0, start) + '  ' + content.slice(end))

    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2
    })
  }

  return (
    <div className="w-full h-full flex bg-background-main font-mono text-sm leading-6">
      <div
        ref={gutterRef}
        className="overflow-hidden select-none py-2 pr-7 pl-8 text-right text-editor-line-count bg-editor-background border-r border-border-line"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <div className="relative flex-1 min-w-0 bg-editor-background">
        <textarea
          wrap="off"
          spellCheck={false}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="absolute inset-0 w-full h-full resize-none outline-none border-none bg-transparent py-2 px-2 whitespace-pre overflow-auto font-[inherit] text-transparent caret-editor-text selection:bg-editor-text-select"
        />

        <pre
          ref={preRef}
          aria-hidden
          className="absolute inset-0 m-0 py-2 px-2 overflow-hidden whitespace-pre pointer-events-none font-[inherit]"
        >
          {tokens.map((t, i) => (
            <span key={i} className={COLORS[t.type]}>
              {t.value}
            </span>
          ))}
          {'\n'}
        </pre>
      </div>
    </div>
  )
}
