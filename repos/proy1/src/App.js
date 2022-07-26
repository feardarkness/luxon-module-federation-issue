import React from "react"
import { DateTime } from "luxon";

const App = () => {

  return (<div>Contentttttttttttttttt
    <p>Date: {DateTime.now().toISO()}</p>
  </div>)
}

export default App;