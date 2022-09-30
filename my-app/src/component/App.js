import Guests from "./Guests";
import Title from "./Title";
import Triangulo from "./Triangle";
import HeartIcon from "./HeartIcon";
import DesignerSignature from "./DesignerSignature";


function App() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center tesrt">
        <Title />
        <Guests />
      </div>
      <DesignerSignature />
      <Triangulo />
      <HeartIcon />
    </div>
  );
}

export default App;
