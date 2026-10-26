import { ReactElement } from 'react'
import CodeEditor from './CodeEditor'

export function Homepage(): ReactElement {
  return (
    <div className="h-full flex flex-col gap-3 items-center justify-center">
      <CodeEditor />
    </div>
  )
}
