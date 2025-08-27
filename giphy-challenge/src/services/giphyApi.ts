import { API_KEY, BASE_URL } from '../constants/api'

export const giphyApi = {
  async searchGifs(query: string, limit: number = 10) {
    try {
      const response = await fetch(
        `${BASE_URL}/search?q=${query}&limit=${limit}&rating=g&api_key=${API_KEY}`
      )
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching GIFs:', error)
      throw error
    }
  }
}
