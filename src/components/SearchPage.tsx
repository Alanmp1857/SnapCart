// import { useState } from "react";
import SearchResult from "./SearchResult";
import { Box } from "@mui/material";

const SearchPage = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  const items = ["Sony Headphone", "Boat Headphone", "JBL Headphone"];

  return (
    <Box>
      {items.map((item) => (
        <SearchResult key={item} name={item} />
      ))}
    </Box>
  );
};

export default SearchPage;
