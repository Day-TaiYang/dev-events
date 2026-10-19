import { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:max-w-4/5  w-full max-lg:px-10 mx-auto lg:py-15">
      {children}
    </div>
  );
};

export default MainContainer;
