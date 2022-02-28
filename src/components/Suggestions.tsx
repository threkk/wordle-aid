import { FixedSizeList as List } from 'react-window'
import { useI18n } from '../i18n/context'

const DEFAULT_NUMBER_OF_ITEMS = 15

interface SuggestionsProps {
  known: string
  guessed: string
  discarded: string
  numberOfItems?: number
}

function normalise(str: string): string {
  return str.toLowerCase().trim()
}

export function Suggestions(props: SuggestionsProps) {
  const [getText, , , words] = useI18n()

  const { known, guessed, discarded, numberOfItems } = props
  const lineHeight = parseInt(
    getComputedStyle(document.body).lineHeight.slice(0, -2)
  )

  let filteredWords: string[] = []

  if (known === '.....' && guessed === '' && discarded === '') {
    const waiting = getText('waiting')
    return (
      <section>
        <div aria-busy='true'>{waiting}</div>
      </section>
    )
  } else {
    const knownRe = new RegExp(normalise(known))
    const discardedRe = new RegExp(`[${normalise(discarded)}]`)

    const guessedTest = (word: string) =>
      normalise(guessed)
        .split('')
        .reduce((acc, letter) => acc && word.includes(letter), true)

    filteredWords = words
      .filter((word) => knownRe.test(word))
      .filter((word) => !discardedRe.test(word))
      .filter((word) => (guessed !== '' ? guessedTest(word) : true))
  }

  const suggested = getText('suggested')
  const notFound = getText('notFound')

  if (filteredWords.length === 0) {
    return (
      <section>
        <h2>{suggested}</h2>
        {notFound}
      </section>
    )
  }

  return (
    <section>
      <h2>{suggested}</h2>
      <List
        height={(numberOfItems ?? DEFAULT_NUMBER_OF_ITEMS) * lineHeight}
        width={'100%'}
        itemSize={lineHeight}
        itemCount={filteredWords.length}
        innerElementType='ul'
        style={{ overflowX: 'hidden' }}
      >
        {({ index, style }) => (
          <li style={{ ...style, marginLeft: '20px' }}>
            {filteredWords[index]}
          </li>
        )}
      </List>
    </section>
  )
}

export default Suggestions
