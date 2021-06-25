import { Gender } from "../electron/@types/entities"

function App() {
   return (
      <div className="App">
         <p>
            Edit <code>src/App.tsx</code> and save to reload.
         </p>
         <button
            onClick={() => {
               const response = window.electron.customer.insert({
                  name: "asd",
                  age: 5,
                  gender: Gender.Male,
               })
               console.log(response)
            }}
         >
            Test
         </button>
      </div>
   )
}

export default App
