function SearchBarAdmin({ searchTerm, handleSearch, handleClickAddUser }) {
  return (
    <div className="search_bar_admin">
      <input
        type="text"
        className="search_input_admin"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="btn_add_admin" onClick={handleClickAddUser}>
        Ajouter un utilisateur
      </button>
    </div>
  );
}

export default SearchBarAdmin;
