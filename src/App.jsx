import { AVAILABLE_PLACES } from "./data";
import Places from "./components/Places";
import Modal from "./components/Modal";
import { useRef, useState } from "react";
import DeleteConfirmation from "./components/DeleteConfirmation";

const storedPlacesId =
  JSON.parse(localStorage.getItem("stored-places-ids")) || [];
const storedPlaces = storedPlacesId.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const modal = useRef();
  const selectedToBeDeletedPlaceId = useRef();
  const [sortedPlaces, setSortedPlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

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
    modal.current.open();
    selectedToBeDeletedPlaceId.current = id;
  }

  function handleCloseModal() {
    modal.current.close();
  }

  function handleDeletePickedPlace() {
    setPickedPlaces((prevPickedPlaces) => {
      return prevPickedPlaces.filter(
        (place) => place.id !== selectedToBeDeletedPlaceId.current
      );
    });
    modal.current.close();

    const storedPlacesId =
      JSON.parse(localStorage.getItem("stored-places-ids")) || [];

    localStorage.setItem(
      "stored-places-ids",
      JSON.stringify(
        storedPlacesId.filter((id) => id !== selectedToBeDeletedPlaceId.current)
      )
    );
  }

  return (
    <>
      <Modal ref={modal} onClose={handleCloseModal}>
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
        places={AVAILABLE_PLACES}
        onSelect={handleAddPickedPlaces}
        fallbackText="Sorting places by distance"
      />
    </>
  );
}

export default App;
