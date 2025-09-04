export function ListInfoComp({ list, heading }) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-semibold">{heading}</h3>
      <div className="flex gap-2 flex-wrap mt-4">
        {list?.map((listObj) => {
          return (
            <div
              key={listObj?.id}
              className="flex flex-col w-full md:w-[49%] p-5 rounded-lg gap-3 bg-[var(--surface)]"
            >
              <h4 className="text-xl font-semibold">{listObj?.title}</h4>
              <p className="font-medium text-[var(--subtitle)]">
                {listObj?.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
