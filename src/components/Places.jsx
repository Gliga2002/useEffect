function Places({ title, places, fallbackText, onSelect }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => {
            return (
              <li key={place.id} className="place">
                <button onClick={() => onSelect(place.id)}>
                  <img src={place.image.src} alt={place.image.alt} />
                  <h3>{place.title}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Places;
