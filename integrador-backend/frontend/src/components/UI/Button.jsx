export const Button = ({ bg, hv, children, px, py, txt }) => {
  return (
    <button
      className={`${bg} ${txt} ${px} ${py} rounded-md hover:${hv} transition-colors`}
    >
      {children}
    </button>
  );
};
