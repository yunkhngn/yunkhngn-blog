import { motion} from 'framer-motion'

const animation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    }
  }

  const transition = {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1], 
    type: "easeInOut",
}

const AnimatedTag = ({children}) => {
  return (
    <motion.main
    variants={animation}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={transition}
    >{children}</motion.main>
  )
}

export default AnimatedTag