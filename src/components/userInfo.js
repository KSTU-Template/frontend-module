export default function UserInfo({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          ID<h1>{userData.id}</h1>
          Логин <h1>{userData.username}</h1>
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
