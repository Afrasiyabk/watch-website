import { Link, useNavigate } from "react-router-dom";
import { Login,resetStatus } from "../store/slices/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => { // Capitalized component name
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { success, error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clear errors when the component mounts
  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the action directly. 
    // .unwrap() allows us to use try/catch on the thunk result
    try {
      await dispatch(Login(formData)).unwrap();        
      navigate('/');
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6! py-12! lg:px-8!">
      {error && <p className="text-red-500 bg-red-100 p-2! rounded mb-4!">{error}</p>}
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-[#222] p-10! rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
         
          <div>
            <label className="block text-sm font-medium text-gray-100">Email address</label>
            <input
              name="email"
              type="email"
              required
              className="block w-full rounded-md bg-white/5 px-3! py-1.5! text-white outline-white/10"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100">Password</label>
            <input
              name="password"
              type="password"
              required
              className="block w-full rounded-md bg-white/5 px-3! py-1.5! text-white outline-white/10"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-gray-600"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-10! text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;