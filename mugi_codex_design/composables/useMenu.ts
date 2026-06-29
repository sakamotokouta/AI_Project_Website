import type { ApiResponse } from '~/types/api'
import type { MenuCategoryFilterValue, MenuItem } from '~/types/menu'

export const useMenu = () => {
  const selectedCategory = ref<MenuCategoryFilterValue>('ALL')
  const query = computed(() => ({ category: selectedCategory.value }))
  const { data, pending, error, refresh } = useFetch<ApiResponse<MenuItem[]>>('/api/menu', { query })

  const menuItems = computed(() => (data.value?.ok ? data.value.data : []))

  const setCategory = (category: MenuCategoryFilterValue) => {
    selectedCategory.value = category
  }

  return {
    selectedCategory,
    menuItems,
    pending,
    error,
    refresh,
    setCategory,
  }
}
