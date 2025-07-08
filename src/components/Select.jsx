import { data } from "../data/data";
import Options from "./Options";
export default function Select({ handleChange }) {
  const selectEl = Object.entries(data).map(([key, value]) => {
    return (
      <div key={key} className="form__inner-wrapper">
        <label htmlFor={key}>Select a {key}</label>
        <select name={key} id={key} onChange={handleChange}>
          <Options valueArray={value} />
        </select>
      </div>
    );
  });
  return <>{selectEl}</>;
}
