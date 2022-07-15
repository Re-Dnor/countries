import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { Info } from "../components/Info";
import { loadCountryByName, clearDetails } from "../features/details-slice";
import { Loader } from "../components/Loader";

export const Details = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const navigate = useNavigate();
  const { currentCountry, error, status } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(loadCountryByName(name));
    return () => {
      dispatch(clearDetails());
    };
  }, [name]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {error && <h2>{error}</h2>}
      {status === "loading" && <Loader />}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
