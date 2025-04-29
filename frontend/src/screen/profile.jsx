import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileActions } from "../actions/authActions";
import { User } from "lucide-react";

export const Profile = () => {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getProfile
  );
  
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    dispatch(getProfileActions());
  }, [dispatch]);

  const handleImageError = (id) => {
    setImgError(prev => ({
      ...prev,
      [id]: true
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 max-w-2xl">
      {message && Array.isArray(message)
        ? message.map((info) => (
            <div
              key={info.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center p-8">
                {imgError[info.id] ? (
                  <div className="bg-gray-100 rounded-full h-32 w-32 flex items-center justify-center mb-6 md:mb-0">
                    <User size={64} className="text-gray-400" />
                  </div>
                ) : (
                  <img
                    src={info.picture}
                    alt={info.name}
                    className="rounded-full h-32 w-32 object-cover mb-6 md:mb-0"
                    onError={() => handleImageError(info.id)}
                  />
                )}
                <div className="ml-0 md:ml-8 text-center md:text-left">
                  <h1 className="text-3xl font-medium text-gray-800 mb-3">{info.name}</h1>
                  <p className="text-lg text-gray-600">{info.email}</p>
                  
                  {info.phone && (
                    <p className="text-lg text-gray-600 mt-2">{info.phone}</p>
                  )}
                  
                  {info.location && (
                    <p className="text-lg text-gray-600 mt-2">{info.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        : !loading && (
            <div className="text-center text-gray-500">No profile data available</div>
          )}
    </div>
  );
};