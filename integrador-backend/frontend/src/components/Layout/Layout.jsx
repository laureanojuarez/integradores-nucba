import { useEffect } from "react";

const Layout = ({ children }) => {
  const { pathname } = window.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="w-full min-h-screen">
      <div className="max-w-5xl mx-auto w-full min-h-screen flex flex-col px-4">
        {children}
      </div>
    </main>
  );
};

export default Layout;
