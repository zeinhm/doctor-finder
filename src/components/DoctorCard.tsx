const DoctorCard = ({ item }) => {
  return (
    <div className="border rounded p-4 flex">
      <div className="w-2/5 mr-4">
        <img className="w-56" src={item?.photo?.url} alt="" />
      </div>
      <div className="w-3/5 flex flex-col justify-between">
        <div>
          <p>{item?.name}</p>
          <p className="text-xs">
            {item?.hospital[0]?.name} - {item?.specialization?.name}
          </p>
          <div
            className="text-xs mt-4 break-words"
            dangerouslySetInnerHTML={{ __html: item?.about }}
          />
        </div>
        <p className="text-right justify-self-end">{item?.price?.formatted}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
