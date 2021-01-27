import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const Header = () => {
  return (
    <div className={classes.Header}>
      <div className={classes.controls}>
        <FontAwesomeIcon icon={faChevronLeft} color="#828282" />
      </div>
      <div className={classes.text}>Let’s plan your saving goal</div>
      <div className={clsx(classes.controls, classes.hidden)}>
        <FontAwesomeIcon icon={faChevronRight} color="#828282" />
      </div>
    </div>
  );
};

export default Header;
