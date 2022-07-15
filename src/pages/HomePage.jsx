import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import { Loader } from "../components/Loader";
import { loadCountries } from "../features/countries-slice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.countries);
  const { search, region } = useSelector((state) => state.controls);
  const countries = useSelector((state) => {
    return state.countries.list.filter(
      (item) => item.name.toLowerCase().includes(search.toLowerCase()) && item.region.includes(region)
    );
  });

  useEffect(() => {
    dispatch(loadCountries());
  }, []);
  return (
    <>
      <Controls />
      {error && <h2>{error}</h2>}
      {status === "loading" && <Loader />}
      {status === "received" && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };
            return <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />;
          })}
        </List>
      )}
    </>
  );
};
