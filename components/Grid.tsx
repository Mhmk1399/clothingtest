import Image from "next/image"

const Grid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-2 py-2 border-gray-100 shadow-md rounded-lg">
      <div className="col-span-2 w-full">
        <Image src="/assets/images/shoes.png" alt="laundry" width={500} height={500} className="w-full h-auto" />
      </div>
      <div className="col-span-1 w-full">
        <Image src="/assets/images/jacket.jpg" alt="laundry" width={500} height={500} className="w-full h-auto rounded-lg" />
      </div>
      <div className="col-span-1 w-full rounded-lg">
        <Image src="/assets/images/panths.jpg" alt="laundry" width={500} height={500} className="w-full h-auto mt-4 rounded-lg" />
      </div>
      <div className="col-span-2 w-full">
        <Image src="/assets/images/accesories.jpg" alt="laundry" width={500} height={500} className="w-full h-auto" />
      </div>
    </div>
  )
}

export default Grid
