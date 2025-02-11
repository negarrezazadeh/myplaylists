function AppContainer({children, classes=''}) { 
  return (
    <main className={`m-auto overflow-hidden  relative xl:ps-[252px] xl:pe-3 xl:pt-3 max-w-[450px] xl:max-w-full ${classes}`}>
      {children}
    </main>
  );
}

export default AppContainer;