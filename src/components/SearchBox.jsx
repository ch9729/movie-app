function SearchBox({ setSearchValue, searchValue }) {
  function handleChange(e) {
    //e.target.value 입력창 적은 내용
    setSearchValue(e.target.value);
  }
  return (
    <div className="col col-sm-4">
      <input
        value={searchValue}
        onChange={handleChange}
        className="form-control"
        placeholder="영화 검색..."
      ></input>
    </div>
  );
}

export default SearchBox;
