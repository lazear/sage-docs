// Example from https://beta.reactjs.org/learn

import { useState } from 'react'
import styles from './counters.module.css'

function MyButton() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick} className={styles.counter}>
        Clicked {count} times
      </button>
    </div>
  )
}

export default function MyApp() {
  return <MyButton />
}

export const ReverseMe = () => {
  const [sequence, setSequence] = useState("PEPTIDEK");
  function rev() {
    let mid = sequence.slice(1, sequence.length - 2).split("").reverse().concat();
    setSequence(sequence[0] + mid + sequence[sequence.length - 1])
  }
  return (
    <div>
      <span>{sequence}</span>
      <button onClick={rev}>Reverse</button>
    </div>
  );
};