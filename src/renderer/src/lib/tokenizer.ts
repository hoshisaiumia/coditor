export type TokenType = 'comment' | 'string' | 'number' | 'keyword' | 'function' | 'plain'

export interface Token {
  type: TokenType
  value: string
}

const KEYWORDS = [
  'import',
  'export',
  'from',
  'default',
  'const',
  'let',
  'var',
  'function',
  'return',
  'if',
  'else',
  'for',
  'while',
  'switch',
  'case',
  'break',
  'continue',
  'new',
  'class',
  'extends',
  'async',
  'await',
  'try',
  'catch',
  'throw',
  'typeof',
  'interface',
  'type',
  'true',
  'false',
  'null',
  'undefined',
  'void'
]

const RULES: { type: TokenType; regex: RegExp }[] = [

  { type: 'comment', regex: /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y },

  {
    type: 'string',
    regex: /`(?:\\[\s\S]|[^`\\])*(?:`|$)|'(?:\\.|[^'\\\n])*(?:'|$)|"(?:\\.|[^"\\\n])*(?:"|$)/y
  },

  { type: 'number', regex: /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?)\b/y },

  { type: 'keyword', regex: new RegExp(`\\b(?:${KEYWORDS.join('|')})\\b`, 'y') },

  { type: 'function', regex: /[A-Za-z_$][\w$]*(?=\s*\()/y },

  { type: 'plain', regex: /[A-Za-z_$][\w$]*/y }
]

function push(tokens: Token[], type: TokenType, value: string): void {
  const last = tokens[tokens.length - 1]
  if (last && last.type === 'plain' && type === 'plain') {
    last.value += value
  } else {
    tokens.push({ type, value })
  }
}

export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let pos = 0

  while (pos < code.length) {
    let matched = false

    for (const rule of RULES) {
      rule.regex.lastIndex = pos
      const m = rule.regex.exec(code)

      if (m && m[0].length > 0) {
        push(tokens, rule.type, m[0])
        pos += m[0].length
        matched = true
        break
      }
    }
    
    if (!matched) {
      push(tokens, 'plain', code[pos])
      pos++
    }
  }

  return tokens
}
