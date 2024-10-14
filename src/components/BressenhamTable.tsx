import { BressenhamResult } from "../types"

interface BressenhamTableProps {
  result: BressenhamResult[]
}

const BressenhamTable = ({ result }: BressenhamTableProps) => {
  return (
    <table className="w-full text-xl text-center mt-3">
      <thead>
        <tr>
          <th className="w-[calc(20%)] border border-black">k</th>
          <th className="w-[calc(20%)] border border-black">pk</th>
          <th className="w-[calc(40%)] border border-black">(xk+1, yk+1)</th>
        </tr>
      </thead>
      <tbody>
        {
          result && result.map((res, i) => (
            <tr key={i}>
              <td className="w-[20%] border border-black">{res.k ?? ''}</td>
              <td className="w-[20%] border border-black">{res.pk ?? ''}</td>
              <td className="w-[40%] border border-black">({res.xk}, {res.yk})</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default BressenhamTable