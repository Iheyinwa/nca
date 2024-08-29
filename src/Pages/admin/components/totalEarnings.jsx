

const TotalEarnings = () => {
  return (
    <section className="m-4 p-4 ">
      <p className="font-bold text-3xl font-dmSerif tracking-wider  py-2">
        Total Earnings
      </p>
      <section className="flex justify-between gap-4 items-center ">
        <div className="shadow-md rounded-md w-full h-64 flex flex-col justify-center items-start p-4">
          <p className="font-bold text-2xl font-poppins">Sango District</p>
          <p className="font-medium text-xl font-poppins">
            Total Money Acquired: ₦100.00
          </p>
        </div>
      </section>
    </section>
  );
}

export default TotalEarnings