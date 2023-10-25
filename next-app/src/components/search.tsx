'use client';
import { useMessenger } from "@/providers/messenger-context";
import { useEffect } from "react";


const Search = () => {
  const { userlike, toggleVisibility } = useMessenger();
  useEffect(() => {

    if (!userlike) return;

    // open chat on mount - later replace with on search
    toggleVisibility(userlike)
  }, [userlike])

  return (
    <div className='text-honolulu-blue'>Search for a SICK product</div>
  )
}

export default Search;