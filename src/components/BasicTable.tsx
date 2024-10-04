import { BasicResult } from "../types"

interface BasicTableProps {
  result: BasicResult[]
}

const BasicTable = ({ result }: BasicTableProps) => {
  return (
    <table className="w-full text-xl text-center mt-3">
      <thead>
        <tr>
          <th className="w-[calc(100%/6)] border border-black">x</th>
          <th className="w-[calc(100%/6)] border border-black">dx</th>
          <th className="w-[calc(100%/6)] border border-black">x</th>
          <th className="w-[calc(100%/6)] border border-black">y(b)</th>
          <th className="w-[calc(100%/6)] border border-black">m</th>
          <th className="w-[calc(100%/6)] border border-black">y</th>
        </tr>
      </thead>
      <tbody>
        {
          result && result.map((res, i) => (
            <tr key={i}>
              <td className="w-[calc(100%/6)] border border-black">{res.x}</td>
              <td className="w-[calc(100%/6)] border border-black">{res.dx ?? ''}</td>
              <td className="w-[calc(100%/6)] border border-black">{res.xc}</td>
              <td className="w-[calc(100%/6)] border border-black">{res.b}</td>
              <td className="w-[calc(100%/6)] border border-black">{res.m ?? ''}</td>
              <td className="w-[calc(100%/6)] border border-black">{res.y}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default BasicTable