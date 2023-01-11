import { useEffect, useState } from 'react'

function useScrollPosition(): number {
	const [scrollPosition, setScrollPosition] = useState<number>(0)

	function handleScroll() {
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight

		const winScroll =
			document.body.scrollTop || document.documentElement.scrollTop

		const scrolled = (winScroll / height) * 100

		setScrollPosition(scrolled)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return scrollPosition
}

export default useScrollPosition
