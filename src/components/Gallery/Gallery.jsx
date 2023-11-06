import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GalleryData from '../../galleryData.json';
// import '../components/Gallery/Gallery.css'

const Gallery = () => {
  const [images, setImages] = useState(GalleryData);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [featureImageIndex, setFeatureImageIndex] = useState(0);

  const handleSelectImage = (index) => {
    const imageId = images[index].id;
    setSelectedImageIds((prevSelectedImageIds) => {
      if (prevSelectedImageIds.includes(imageId)) {
        return prevSelectedImageIds.filter((id) => id !== imageId);
      } else {
        return [...prevSelectedImageIds, imageId];
      }
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // No destination, nothing to reorder
    }

    const reorderedImages = [...images];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedImages);
    if (result.source.index === featureImageIndex) {
      setFeatureImageIndex(result.destination.index);
    }
  };

  const handleDeleteImages = () => {
    const imagesToKeep = images.filter((image) => !selectedImageIds.includes(image.id));
    setImages(imagesToKeep);
    setSelectedImageIds([]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
         <button className='button' onClick={handleDeleteImages}>Delete Selected</button>
      <Droppable droppableId="imageGallery">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-auto-fill grid-cols-5 grid-rows-4"
          >
            {images.map((image, index) => (
              <Draggable key={image.id.toString()} draggableId={image.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-2 ${
                      index === featureImageIndex
                        ? 'col-span-2 row-span-2' // Style for feature image
                        : ''
                    }`}
                  >
                    <div className='relative group border-slate-300 border p-2 col-span-4 rounded-md transition duration-300'>
                    <img className='w-full h-auto group-hover:opacity-100 hover:bg-slate-400' src={image.src} alt={image.src} />
                    <input className='absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition duration-300'
                      type="checkbox"
                      onChange={() => handleSelectImage(index)}
                      checked={selectedImageIds.includes(image.id)}
                    />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
     
    </DragDropContext>
  );
};

export default Gallery;
