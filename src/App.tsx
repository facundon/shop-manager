function App() {
   return (
      <div className="App">
         <p>
            Edit <code>src/App.tsx</code> and save to reload.
         </p>
         <button
            onClick={() => {
               const response = window.electron.customer.insert(
                  "asd",
                  5,
                  "male"
               )
               console.log(response)
            }}
         >
            Test
         </button>
      </div>
   )
}

export default App
