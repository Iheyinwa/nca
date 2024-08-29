

const Footer = () => {
  return (
    <footer className=" bg-slate-200 relative flex justify-center items-center h-[350px] gap-4">
      <div className="h-[300px] flex absolute -top-40 shadow-md justify-center items-center py-4 my-4 bg-white w-[80%] rounded-md">
        <p className="text-3xl md:text-6xl leading-[60px] md:leading-[70px] font-bold p-4 lg:w-3/5 text-center font-dmSerif">
          The more you vote, the higher the chances of winning
        </p>
      </div>
      <div className="relative top-20 w-full">
        <div className="w-full h-[1px] my-2 bg-gray-400"></div>
        <p className="font-poppins text-center">
          &copy; Assemblies of God South West Zone
        </p>
      </div>
    </footer>
  );
}

export default Footer