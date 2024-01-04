import create from 'zustand'
import data from '../data.json'

const useSearchStore = create((set) => ({
  searchQuery: [],
  data, // data from data.json
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredData: (data, searchQuery) =>
    data.filter((item) => item.languages.includes(searchQuery?.toLowerCase())),
}))

export default useSearchStore
