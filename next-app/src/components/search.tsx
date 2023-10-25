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

    userlike.state$.subscribe({
      next: (state) => console.log("next", state),
      complete: () => console.log("complete"),
    });

    // subscription.subscribe();
  }, [userlike])

  // userlike.setCustomData({
  //   showReel: {
  //     DefUlr: products.hits[0].masterValues.DefUrl,
  //     DefPictureUrl: products.hits[0].masterValues.DefPictureUrl // e.g. "https://cdn.sick.com/media/pim/5/55/255/IM0085255.png" 
  //   }
  // })

  console.log(userlike, 'userlike')

  // console.log(subscription, 'subscription')
  return (
    <h1 className='text-honolulu-blue '>Search for a SICK product</h1>
    // TODO: add showreel of suggestions
  )
}

export default Search;