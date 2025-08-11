export const Feature = ({ title, desc, icon }) => {
  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="text-gray-700 text-sm mt-1">{desc}</p>
    </div>
  );
};
