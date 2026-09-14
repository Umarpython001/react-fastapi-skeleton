interface UserInfo {

  name: string,
  age: number,


}

function Home({name, age}: UserInfo) {
  return (
    <div>
      <h1>Welcome to the Home Page, {name}</h1>
      <p>You are {age} years old.</p>
    </div>
  )
}

export default Home