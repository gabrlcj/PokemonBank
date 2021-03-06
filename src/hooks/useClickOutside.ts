import { useEffect, RefObject } from 'react'

type ClickEvent = MouseEvent | TouchEvent

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: ClickEvent) => void
): void {
  useEffect(() => {
    const listener = (event: ClickEvent) => {
      const element = ref?.current

      // Não faz nada ao clicar em uma elemento da ref ou descendente da mesma
      if (!element || element.contains(event.target as Node)) return

      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
