import React, { createContext, useState } from "react";

const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
  const [reviewId, setReviewId] = useState(null);

  return (
    <ReviewContext.Provider value={{ reviewId, setReviewId }}>
      {children}
    </ReviewContext.Provider>
  );
};

export { ReviewContext, ReviewProvider };
