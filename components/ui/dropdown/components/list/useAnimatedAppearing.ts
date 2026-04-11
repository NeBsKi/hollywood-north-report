import { useEffect, useRef } from 'react'

export const useAnimatedAppearing = ({ isOpen }: { isOpen: boolean }) => {
  const listRef = useRef<null | HTMLUListElement>(null)

  useEffect(() => {
    //HACK: The setTimeout is needed to fix an issue with broken appearance animation
    const timeoutId = setTimeout(() => {
      const listElement = listRef.current

      if (!listElement) return

      if (isOpen) {
        listElement.style.opacity = '1'
        listElement.style.removeProperty('display')

        return
      }

      listElement.style.display = 'none'
      listElement.style.opacity = '0'
    })

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isOpen])

  return listRef
}
