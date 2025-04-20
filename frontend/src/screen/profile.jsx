import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileActions } from "../actions/authActions";
export const Profile = () => {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getProfile
  );

  useEffect(() => {
    dispatch(getProfileActions());
  }, []);

  return (
    <div className="container mx-auto py-20 w-full md:w-1/2 ">
      
      {message
        ? message.map((info) => (
            <div
              key={info.id}
              className=" bg-gray-800 rounded-lg p-4 text-white"
            >
              <div className="flex flex-row ">
                <img
                  src={info.picture}
                  alt="Profile"
                  className="rounded-full w-auto h-auto p-4"
                />
                <div className="flex flex-col w-full items-start p-4">
                  <h1 className="text-lg py-2 text-neutral-400"><b>Name:</b> {info.name}</h1>
                  <h1 className="text-lg py-2 text-neutral-400"><b>Email:</b> {info.email}</h1>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
