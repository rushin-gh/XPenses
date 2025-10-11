import ReactDOM from "react-dom/client";

import Header from "./Components/Header";
import Body from "./Components/Body";

const AppLayout = () => {
  return (
    <div id="appLayout">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
