interface BlockProps {
  xPos: number
  yPos: number
  isCoordinate: (xPos: number, yPos: number) => boolean
}

const Block = ({ xPos, yPos, isCoordinate }: BlockProps) => {
  return (
    <div className={`w-[50px] h-[50px] border border-black ${isCoordinate(xPos, yPos) ? 'bg-black' : 'bg-green-500'}`} />
  )
}

export default Block