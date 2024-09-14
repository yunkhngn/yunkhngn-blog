import Image from 'next/image'

const Snake = ({theme}) => {
    const snake = theme == "dark" ? "https://raw.githubusercontent.com/yunkhngn/yunkhngn/output/github-contribution-grid-snake-dark.svg" : "https://raw.githubusercontent.com/yunkhngn/yunkhngn/output/github-contribution-grid-snake.svg"
  return (
    <div
    className="snake"
    >
        <Image 
            src={snake}
            fill='contain'
            alt='snake'
            onDragStart={e => e.preventDefault()}
            />
    </div>
  )
}

export default Snake