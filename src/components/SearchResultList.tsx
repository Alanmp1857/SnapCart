import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import { Box } from "@mui/material";
import { SearchCardProps } from "../models/SearchCard.interface";
import ProductService from "../services/productService";

interface SearchResultListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchQuery }) => {
  const [results, setResults] = useState<SearchCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSearchResults = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts();
      const products = response.data;
      setResults(products);
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setError(null);
      getSearchResults();
      setResults([]);
    } else {
      setResults([]); // Clear results when searchQuery is empty
    }
  }, [searchQuery]);

  // Filter the results based on the searchQuery
  const filteredResults = results.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>
      {filteredResults.length > 0 &&
        filteredResults.map((product: any) => (
          <SearchResultCard
            key={product.id}
            images={product.images}
            title={product.title}
            price={product.price}
            reviews={product.reviews}
          />
        ))}
    </Box>
  );
};

export default SearchResultList;
