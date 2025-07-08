import RegularButton from "../components/RegularButton";
import Select from "./Select";

const Form = ({ handleSubmit, handleChange }) => {
  return (
    <div className="form-container">
      <p className="p-regular">
        customize the game by selecting an emoji category and a number of memory
        cards.
      </p>
      <form className="wrapper">
        <Select handleChange={handleChange} />
        {/* <div className="form__inner-warpper">
          <label htmlFor="category"> category</label>
          <select name="category" id="category" onChange={handleChange}>
            <option value="animals-and-nature">animals and nature</option>
            <option value="food-and-drink">food and dirnk</option>
            <option value="travel-and-places">travel and places</option>
            <option value="objects">objects</option>
            <option value="symbols">symbols</option>
          </select>
        </div>
        <div className="form__inner-warpper">
          <label htmlFor="number">numbers</label>
          <select name="number" id="number" onChange={handleChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div> */}
        <RegularButton handleClick={handleSubmit}> Start Game</RegularButton>
      </form>
    </div>
  );
};

export default Form;
