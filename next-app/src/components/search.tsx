'use client';
import { useMessenger } from "@/providers/messenger-context";
import { useEffect } from "react";


const Search = () => {
  const { userlike } = useMessenger();
  console.log(userlike, 'userlike in search')

  return (
    <div className='text-honolulu-blue'>Search for a SICK product</div>
  )
}

export default Search;