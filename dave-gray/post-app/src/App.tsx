const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <form className="w-full max-w-md space-y-5">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Post Title</span>
              </div>
              <input
                type="text"
                className="input input-bordered bg-neutral w-full"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Author</span>
              </div>
              <input
                type="text"
                className="input input-bordered bg-neutral w-full"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Content</span>
              </div>
              <textarea className="textarea bg-neutral textarea-bordered"></textarea>
            </label>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-wide flex">Accept</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
