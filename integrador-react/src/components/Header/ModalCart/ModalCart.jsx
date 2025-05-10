export default function ModalCart() {
  return (
    <>
      {!hiddenCart && (
        <div onClick={handleToggleHiddenCart} isHidden={hiddenCart}></div>
      )}
    </>
  );
}
