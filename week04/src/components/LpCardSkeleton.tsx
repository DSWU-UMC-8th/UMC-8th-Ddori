const LpCardSkeleton = () => {
  return (
    <div
      className="relative group overflow-hidden rounded-md shadow-lg cursor-pointer"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
      </div>
    </div>
  )
}

export default LpCardSkeleton