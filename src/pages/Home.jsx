import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="h-screen flex items-center justify-center bg-indigo-100">
        <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md text-center space-y-4">
          <h1 className="text-lg font-semibold text-gray-700">
            {user.photoURL && (
              <img src={user.photoURL} className="w-7 h-7 rounded-full" />
            )}
            Oturumunuz açık ({user.email})
          </h1>

          {!user.emailVerified && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md shadow-md">
              <p className="text-sm">
                E-posta adresiniz doğrulanmamış. Lütfen e-postanızı doğrulayın.
              </p>
              <button
                onClick={handleVerification}
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                E-posta Onayla
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
          >
            Çıkış Yap
          </button>

          <UpdateProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4">
        <h1 className="text-lg font-semibold text-gray-700">
          Lütfen giriş yapın veya kayıt olun
        </h1>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Kayıt Ol
          </Link>
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
