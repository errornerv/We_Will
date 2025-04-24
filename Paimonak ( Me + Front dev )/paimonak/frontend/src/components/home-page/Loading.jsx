export default function Loading() {
  return (
    <div className="flex gap-5 mt-3 mx-3">
      <div className="flex justify-center items-center w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>

      <div className="flex justify-center items-center w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
  );
}
