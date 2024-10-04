import { useEffect, useState, useRef } from "react"
import { FormData, BasicResult, ErrorState, DDAResult, Coordinate } from "./types"
import { basicAlgorithm, DDAAlgorithm } from "./utils/algorithm"
import { BasicTable, Chart, DDATable, Input } from "./components"

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    algorithm: "basic",
  })
  const [result, setResult] = useState<BasicResult[] | DDAResult[] | null>(null)
  const [error, setError] = useState<ErrorState>({
    isError: false,
    message: ''
  })
  const [coordinate, setCoordinate] = useState<Coordinate[] | null>(null)

  const resultRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setResult(null)
    setCoordinate(null)
  }, [formData.algorithm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, id } = e.target

    setError({
      isError: false,
      message: ''
    })

    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        algorithm: id as "basic" | "dda",
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const form = {
        x1: parseFloat(formData.x1 as unknown as string),
        y1: parseFloat(formData.y1 as unknown as string),
        x2: parseFloat(formData.x2 as unknown as string),
        y2: parseFloat(formData.y2 as unknown as string),
      }
      let result: BasicResult[] | DDAResult[] = []

      if (formData.algorithm === 'basic') {
        result = basicAlgorithm(form)
        const coord: Coordinate[] = []

        for (const res of result) {
          coord.push({
            x: res.xc,
            y: Math.round(res.y)
          })
        }
        setCoordinate(coord)
      } else {
        result = DDAAlgorithm(form)

        const coord: Coordinate[] = []

        for (const [i, res] of result.entries()) {
          if (i === 0) continue

          coord.push({
            x: res.roundX,
            y: res.roundY
          })
        }
        setCoordinate(coord)
      }

      setResult(result)

      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 2)

    } catch (error) {
      if (error instanceof Error) {
        setError({
          isError: true,
          message: error.message
        })
      }
    }
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()

    setFormData({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      algorithm: "basic",
    })

    setResult(null)
    setCoordinate(null)
    setError({
      isError: false,
      message: ''
    })
  }

  return (
    <div className="w-full min-h-screen bg-amber-200 pt-5 pb-40 flex flex-col items-center">
      <div className="w-[84%]">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">Line Drawing Algorithm</h1>

        <form onSubmit={handleForm} onReset={handleReset} className="w-full flex flex-col gap-y-5">
          <div className="flex flex-wrap justify-between gap-y-3 mt-5">
            <div className="p-6 bg-slate-300 rounded-xl">
              <h1 className="text-xl font-bold text-center">Point A</h1>
              <div className="w-full flex flex-wrap justify-center lg:justify-between gap-x-3 gap-y-2">
                <Input label="x" id="x1" type="number" onChange={handleInputChange} value={formData.x1} required />
                <Input label="y" id="y1" type="number" onChange={handleInputChange} value={formData.y1} required />
              </div>
            </div>

            <div className="p-6 bg-slate-300 rounded-xl">
              <h1 className="text-xl font-bold text-center">Point B</h1>
              <div className="w-full flex flex-wrap justify-center lg:justify-between gap-x-3 gap-y-2">
                <Input label="x" id="x2" type="number" onChange={handleInputChange} value={formData.x2} required />
                <Input label="y" id="y2" type="number" onChange={handleInputChange} value={formData.y2} required />
              </div>
            </div>

            <div className="p-6 bg-slate-300 rounded-xl w-full sm:w-fit">
              <h1 className="text-xl font-bold mb-2">Algorithm</h1>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="alg" id="basic" className="w-[18px] h-[18px]" onChange={handleInputChange} checked={formData.algorithm === "basic"} />
                <label htmlFor="basic" className="text-md font-bold">Basic Algorithm</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="alg" id="dda" className="w-[18px] h-[18px]" onChange={handleInputChange} checked={formData.algorithm === "dda"} />
                <label htmlFor="dda" className="text-md font-bold">Digital Differential Analyzer (DDA)</label>
              </div>
            </div>
          </div>

          <div className="flex sm:justify-end gap-x-4">
            <button type="reset" className="w-[180px] h-[48px] bg-red-600 rounded-xl text-white font-bold text-xl">Reset</button>
            <button type="submit" className="w-[180px] h-[48px] bg-blue-600 rounded-xl text-white font-bold text-xl">Submit</button>
          </div>
        </form>

        <div ref={resultRef} className="w-full bg-slate-300 mt-8 p-5 rounded-lg max-h-[52vh] overflow-auto">
          <h1 className="text-xl sm:text-3xl font-bold">Result:</h1>

          {
            error.isError ? (
              <p className="text-2xl">{error.message}</p>
            ) : result ? formData.algorithm === 'basic' ? (
              <BasicTable result={result as BasicResult[]} />
            ) : (
              <DDATable result={result as DDAResult[]} />
            ) : null
          }
        </div>

        <div className="w-full bg-slate-300 mt-8 p-5 rounded-lg max-h-[70vh] overflow-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-3">Chart:</h1>
          {
            coordinate ? (
              <Chart coordinates={coordinate} />
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default App
