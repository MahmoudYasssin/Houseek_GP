import { Form } from "./Form"
import { Header } from "./Header"
import { Leftside } from "./Leftside"
import "./css/Add.css"

export const Add = () => {
  return (
    <div className="dashboard">
      {" "}
      <Header />
      <div className="bodycontainer">
        <Leftside />
        <div className="contentwrapper">
          <div className="dashtitle">
            <h1>add property</h1>
            <h5>
              We'd love to find out more about you. It'll help us make sure our
              website and apps tick the right boxes.
            </h5>
          </div>
        </div>
        <Form />
      </div>
    </div>
  )
}
