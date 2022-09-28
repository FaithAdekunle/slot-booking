import ReactOnRails from "react-on-rails";

import "bootstrap/dist/css/bootstrap.min.css";
import Slots from "../bundles/Slots/components/SlotsServer";

// This is how react_on_rails can see the Slots in the browser.
ReactOnRails.register({
  Slots
});
