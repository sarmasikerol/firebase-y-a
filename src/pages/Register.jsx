import { useState } from "react";
import { register } from "../firebase";
import { useDispatch } from "react-redux";
import { login as loginHandle } from "../store/auth";

export default function Register() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    dispatch(loginHandle(user));
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center bg-indigo-300 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            E-posta
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={!email || !password}
          type="submit"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
