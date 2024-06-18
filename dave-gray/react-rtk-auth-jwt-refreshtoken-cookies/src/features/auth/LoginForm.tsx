import { useAppDispatch } from "app/hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

interface ApiError {
  originalStatus?: number;
  data?: any;
  status: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [user, setuser] = useState("");
  const [pwd, setpwd] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  });

  useEffect(() => {
    seterrMsg("");
  }, [user, pwd]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...data, user }));
      setuser("");
      setpwd("");
      navigate("/dashboard");
    } catch (err) {
      const error = err as ApiError;
      if (!error?.originalStatus) {
        // isLoading: true until timeout occurs
        seterrMsg("No Server Response");
      } else if (error.originalStatus === 400) {
        seterrMsg("Missing Username or Password");
      } else if (error.originalStatus === 401) {
        seterrMsg("Unauthorized");
      } else {
        seterrMsg("Login Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };
  const content = isLoading ? (
    <h1>loading...</h1>
  ) : (
    <form className="card max-w-md border border-neutral" onSubmit={onSubmit}>
      <div className="card-body">
        {errMsg && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errMsg}</span>
          </div>
        )}
        <label className="from-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user}
            onChange={({ target }) => setuser(target.value)}
          />
        </label>
        <label className="from-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={pwd}
            onChange={({ target }) => setpwd(target.value)}
          />
        </label>
        <div className="card-actions">
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </div>
    </form>
  );

  return content;
};

export default LoginForm;
