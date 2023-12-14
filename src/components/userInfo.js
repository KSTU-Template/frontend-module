export default function UserInfo({userData}) {
    return (<div>
        ID<h1>{userData.id}</h1> Логин <h1>{userData.username}</h1>
        <br/>
    </div>);
}
