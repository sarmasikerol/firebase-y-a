import React, { useState } from "react";
import { login } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, update } from "../firebase";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Profili Güncelle
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad-soyad
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg p-2"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Adınızı ve soyadınızı girin"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fotoğraf
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg p-2"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Adınızı ve soyadınızı girin"
          />
        </div>
        <button
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          type="submit"
        >
          Güncelle
        </button>
      </form>
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-lg shadow-lg w-full h-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Parolayı Güncelle
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parola
          </label>
          <input
            type="password"
            name="displayName"
            id="displayName"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parola değiştir"
          />
        </div>

        <button
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium mt-20"
          type="submit"
        >
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
