import { useContext } from "react";
import { Appcontext } from "../App";

const useAuth = () => {
    return useContext(Appcontext)
}

export default useAuth;