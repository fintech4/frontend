import React from "react";
import Navigation from "../ui/bar/Navigation";
import Table from '../ui/Table';


const MyPage = () => {
  return (
    <div>
      <Navigation path={"/mypage"} isLoggedIn={false} />
      <Table />
    </div>
  );
};

export default MyPage;
