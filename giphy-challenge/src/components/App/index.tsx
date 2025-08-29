import React, { useState } from 'react'
import { giphyApi } from '../../services/giphyApi'
import { ITEMS_PER_PAGE } from '../../constants/api'
import Pagination from '../Pagination/index'
import './App.css'

interface Gif {
  id: string
  title: string
  images: {
    downsized_medium: {
      url: string
    }
  }
}

type TextPosition = 'on top of image - center top' | 'on top of image - center bottom' | 'below image - center'

function App() {
  const [images, setImages] = useState<Gif[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [search, setSearch] = useState<string>('cats')
  const [displayText, setDisplayText] = useState<string>('')
  const [textPosition, setTextPosition] = useState<TextPosition>('on top of image - center top')

  const searchImages = async () => {
    setLoading(true)
    try {
      const data = await giphyApi.searchGifs(search)
      setImages(data)
      setPage(0)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const startIndex = page * ITEMS_PER_PAGE
  const currentImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)

  return (
    <div className="container">
      <h1>Giphy Challenge</h1>
      
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for GIFs..."
          className="search-input"
        />
        <button onClick={searchImages} className="search-button">
          Search
        </button>
      </div>

      <div>
        <input
          type="text"
          value={displayText}
          onChange={(e) => setDisplayText(e.target.value)}
          placeholder="Text to display"
        />
        <select
          value={textPosition}
          onChange={(e) => setTextPosition(e.target.value as TextPosition)}
        >
          <option value="on top of image - center top">Top Center</option>
          <option value="on top of image - center bottom">Bottom Center</option>
          <option value="below image - center">Below Image</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      <div className="images-grid">
        {currentImages.map((gif) => (
          <div key={gif.id} className="image-card">
            {textPosition === 'below image - center' ? (
              <>
                <img src={gif.images.downsized_medium.url} alt={gif.title} />
                {displayText && <div className="text-below">{displayText}</div>}
              </>
            ) : (
              <div className="image-container">
                <img src={gif.images.downsized_medium.url} alt={gif.title} />
                {displayText && (
                  <div className={`text-overlay ${textPosition.includes('top') ? 'text-overlay-top' : 'text-overlay-bottom'}`}>
                    {displayText}
                  </div>
                )}
              </div>
            )}
            <p className="image-title">{gif.title}</p>
          </div>
        ))}
      </div>

      <Pagination 
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}

export default App
