interface GuessedLetterProps {
  handleGuessedUpdate: (letter: string) => void
}

export function GuessedLetters(props: GuessedLetterProps) {
  return (
    <section>
      <h2>🟨 What you guessed</h2>
      <input
        type='text'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        name='guessed'
        defaultValue=''
        onChange={(ev) => props.handleGuessedUpdate(ev.target.value)}
      />
    </section>
  )
}

export default GuessedLetters
