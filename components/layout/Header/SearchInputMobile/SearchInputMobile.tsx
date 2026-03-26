import * as motion from 'motion/react-client'

import { SearchInput } from '../SearchInput'
import { SearchInputMobileProps } from './SearchInputMobile.types'

export const SearchInputMobile = ({ isOpen }: SearchInputMobileProps) => {
  const springTransition = {
    type: 'spring' as const,
    stiffness: 700,
    damping: 20,
  }

  const menuVariants = {
    hidden: {
      y: '-100%',
      transition: springTransition,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: springTransition,
    },
    exit: {
      y: '0%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      aria-hidden={!isOpen}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="exit"
      variants={menuVariants}
      className="px-4 py-2"
    >
      <SearchInput isMobile />
    </motion.div>
  )
}
