import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';

import { SearchBar } from './SearchBar/SearchBar';
import { getGallerydData, searchParams } from './API/getGalleryData';
import { Loading } from './loading/Loading';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ButtonTypes } from './Button/ButtonTypes';

export const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPages, setMaxPages] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isSubmite, setIsSubmite] = useState(false);

  useEffect(() => {
    if (!query) return;
    searchParams.q = query;
    searchParams.page = page;

    getData();

    async function getData() {
      toggleLoading();
      const res = await getGallerydData(searchParams);
      toggleLoading();

      if (!res) return;

      if (!res.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const maxPages = Math.ceil(res.totalHits / searchParams.per_page);

      setMaxPages(maxPages);
      setGalleryItems(prev => [...prev, ...res.hits]);

      if (isSubmite) {
        Notify.success(`Hooray! We found ${res.totalHits} images.`);
      }
    }
  }, [query, page]);

  const toggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  const handleSubmit = query => {
    setGalleryItems([]);
    setMaxPages(1);
    setPage(1);
    setIsSubmite(true);
    setQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setIsSubmite(false);
  };

  return (
    <>
      <SearchBar handleSubmite={handleSubmit} isLoading={isLoading} />
      {galleryItems.length > 0 && <ImageGallery galleryItems={galleryItems} />}
      {isLoading && <Loading />}
      {maxPages > 1 && page < maxPages && (
        <Button onClick={handleLoadMore} {...ButtonTypes.loadMore} />
      )}
    </>
  );
};
