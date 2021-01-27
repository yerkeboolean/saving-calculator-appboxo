import classes from "./App.module.css";
import { Header, Calculator } from "./components";

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <Calculator />
    </div>
  );
};

export default App;
