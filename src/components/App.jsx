import styles from './App.module.css';
import { useState, useEffect } from 'react';
import { getApi } from '../services/getApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [queryName, setQueryName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [largeImgUrl, setLargeImg] = useState('')


 useEffect(() => { 
    if(!queryName) return;

  async function getImages(){
    setIsLoading(true);
    try{
      const data = await getApi(page, queryName);

      if(!data.length){
        alert('No images found for this query');
      }
      
        const filteredImagesArr = data.map(
          ({ id, largeImgUrl, webformatURL }) => {
            return { id, largeImgUrl, webformatURL };
          }
        );
        setImages(prevImages => [...prevImages, ...filteredImagesArr]);
          
      }catch(err) {
        console.log(err);
      }finally{
        setIsLoading(false);
      }
  }

  getImages();
},[queryName, page]);



  // const getMoreImages = () => {
  //   setPage(prevPage => prevPage + 1);
  // };

  
  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements[1].value;
    setPage(1);
    setQueryName(inputValue);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage => prevPage + 1));
  };

  const setLargeImgUrl = e => {
   setLargeImg(e.target.dataset.url)
   
  };

  const closeModal = () => {
    setLargeImg('')
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={setLargeImgUrl} />
      )}
      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {largeImgUrl && <Modal url={largeImgUrl} onClick={closeModal} />}
    </div>
  )
      }
    