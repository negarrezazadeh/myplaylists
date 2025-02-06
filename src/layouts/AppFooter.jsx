import BottomNavigation from "./BottomNavigation";

function AppFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-[126px] w-full max-w-[450px] flex-col items-center justify-end bg-dark  xl:top-3 rounded-lg xl:mx-0 xl:h-full xl:w-max xl:justify-start">
      <BottomNavigation />
    </div>
  );
}

export default AppFooter;
