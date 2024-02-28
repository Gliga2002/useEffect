import { AVAILABLE_PLACES } from "./data";
import Places from "./components/Places";
import Modal from "./components/Modal";
import { useEffect, useState, useCallback, useRef } from "react";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { sortPlacesByDistance } from "./loc";

const storedPlacesId =
  JSON.parse(localStorage.getItem("stored-places-ids")) || [];
const storedPlaces = storedPlacesId.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedToBeDeletedPlaceId = useRef();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortedPlaces, setSortedPlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setSortedPlaces(sortedPlaces);
    });
  }, []);

  function handleAddPickedPlaces(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }

      const place = AVAILABLE_PLACES.find((place) => place.id === id);

      return [place, ...prevPickedPlaces];
    });

    const storedPlacesId =
      JSON.parse(localStorage.getItem("stored-places-ids")) || [];
    if (storedPlacesId.indexOf(id) === -1) {
      localStorage.setItem(
        "stored-places-ids",
        JSON.stringify([id, ...storedPlacesId])
      );
    }
  }

  function handleOpenModal(id) {
    setIsOpenModal(true);
    selectedToBeDeletedPlaceId.current = id;
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  const handleDeletePickedPlace = useCallback(
    function handleDeletePickedPlace() {
      setPickedPlaces((prevPickedPlaces) => {
        return prevPickedPlaces.filter(
          (place) => place.id !== selectedToBeDeletedPlaceId.current
        );
      });
      setIsOpenModal(false);

      const storedPlacesId =
        JSON.parse(localStorage.getItem("stored-places-ids")) || [];

      localStorage.setItem(
        "stored-places-ids",
        JSON.stringify(
          storedPlacesId.filter(
            (id) => id !== selectedToBeDeletedPlaceId.current
          )
        )
      );
    },
    []
  );

  return (
    <>
      <Modal isOpenModal={isOpenModal} onClose={handleCloseModal}>
        <DeleteConfirmation
          onClose={handleCloseModal}
          onConfirm={handleDeletePickedPlace}
        />
      </Modal>
      <Places
        title="I'd like to visit ..."
        places={pickedPlaces}
        onSelect={handleOpenModal}
        fallbackText="Select the places you would like to visit below."
      />
      <Places
        title="Available Places"
        places={sortedPlaces}
        onSelect={handleAddPickedPlaces}
        fallbackText="Sorting places by distance"
      />
    </>
  );
}

export default App;
