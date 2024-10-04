import { DDAResult } from "../types"

interface DDATableProps {
  result: DDAResult[]
}

const DDATable = ({ result }: DDATableProps) => {
  return (
    <table className="w-full text-xl text-center mt-3">
      <thead>
        <tr>
          <th className="w-[calc(20%)] border border-black">k</th>
          <th className="w-[calc(20%)] border border-black">x</th>
          <th className="w-[calc(20%)] border border-black">y</th>
          <th className="w-[calc(40%)] border border-black">round(x), round(y)</th>
        </tr>
      </thead>
      <tbody>
        {
          result && result.map((res, i) => (
            <tr key={i}>
              <td className="w-[20%] border border-black">{res.k ?? ''}</td>
              <td className="w-[20%] border border-black">{res.x ?? ''}</td>
              <td className="w-[20%] border border-black">{res.y ?? ''}</td>
              <td className="w-[40%] border border-black">({res.roundX}, {res.roundY})</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default DDATable