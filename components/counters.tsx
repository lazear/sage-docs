// Example from https://beta.reactjs.org/learn

import { useEffect, useState } from 'react'
import styles from './counters.module.css'
import axios from 'axios';
import { Table } from 'nextra/components';

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
      <button onClick={rev} style={{ border: "" }}>Reverse</button>
    </div>
  );
};

interface Data {
  psms: number,
  peptides: number,
  proteins: number,
  run_time: number,
  memory_use: number,
  timestamp: string,
  config: any,
  git_commit: string,
  pxd: string,
}
export const SageCI = () => {
  const [err, setError] = useState("")
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    axios.get<Data[]>('https://d3m290fwl9qhbc.cloudfront.net/results.json')
      .then((resp) => setData(resp.data))
      .catch((err) => setError(JSON.stringify(err)))
  })

  return (
    <div className="w-full my-4">
      <table className="table table-auto border-separate border-2 border-slate-200 bordering-spacing-4 p-2 w-full text-left">
        <thead> 
          <tr>
          <th>PXD</th>
          <th>PSMS</th>
          <th>Peptides</th>
          <th>Proteins</th>
          <th>CPU (s)</th>
          <th>RAM (GiB)</th>
          <th>Timestamp</th>
          <th>Git Commit</th>
          <th>Sage Version</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              <td><a href={`https://www.ebi.ac.uk/pride/archive/projects/${row.pxd}`} className="text-orange-600 underline">{row.pxd}</a></td>
              <td>{row.psms}</td>
              <td>{row.peptides}</td>
              <td>{row.proteins}</td>
              <td>{row.run_time.toFixed(1)}</td>
              <td>{(row.memory_use / (1024 * 1024)).toFixed(1)}</td>
              {/* <td>{new Date(row.timestamp).toLocaleDateString()}</td> */}
              <td>{new Date(row.timestamp).toLocaleString()}</td>
              {/* <td>{row.timestamp}</td> */}
              <td><a href={`https://github.com/lazear/sage/commit/${row.git_commit}`}
                className="text-orange-600 underline">{row.git_commit.slice(0, 7)}</a></td>
              <td>{row.config.version}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}