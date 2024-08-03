import React from "react";
import Navigation from "../ui/bar/Navigation";

const MyPage = () => {
  return (
    <div>
      <Navigation path={"/mypage"} />
      <h1>My Page</h1>
      <p>Welcome to My Page.</p>
    </div>
  );
};

export default MyPage;
