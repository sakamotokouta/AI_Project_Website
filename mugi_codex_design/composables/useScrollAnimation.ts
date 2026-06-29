export const useScrollAnimation = () => {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!target.value) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(target.value)
  })

  return { target, isVisible }
}
