'use client';
import { useMessenger } from "@/providers/messenger-context";
import { useEffect } from "react";
import products from '../../products.json'


const Search = () => {
  const { userlike, toggleVisibility } = useMessenger();

  useEffect(() => {
    if (!userlike) return;
    // open chat on mount - later replace with on search
    toggleVisibility(userlike)
    console.log(userlike, 'userlike in search')


  }, [userlike])


  return (
    <h1 className='text-honolulu-blue '>Search for a SICK product</h1>
    // TODO: add showreel of suggestions
  )
}

export default Search;