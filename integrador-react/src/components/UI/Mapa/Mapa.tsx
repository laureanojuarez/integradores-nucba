export const Mapa = () => {
  return (
    <div className="w-full">
      <iframe
        width="100%"
        height="400"
        frameBorder={0}
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Dr.%20Cue%20874+(El%20Terrible%20Panaderia)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        title="Ubicación de El Terrible Panadería"
        className="rounded-3xl p-3"
      />
    </div>
  );
};
