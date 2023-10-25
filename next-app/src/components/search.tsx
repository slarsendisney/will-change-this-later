'use client';
import { useMessenger } from "@/providers/messenger-context";


const Search = () => {
  const { userlike } = useMessenger();
  return (
    <div>Search for a SICK product</div>
  )
}

export default Search;