import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const NavigationBar = styled.nav`
  display: flex;
  background-color: #fff;
`;

const NavigationWrapper = styled.div`
  width: 1532px;
  margin: 0 auto;
  padding: 0 360px;
  display: flex;
  justify-content: space-between;
`;

const HomeLinkWrapper = styled.ul``;

const LogoImage = styled.img`
  width: 150px;
  padding: 25px 0;
`;

const TabLinkWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const TabLink = styled(Link)`
  margin-left: 61px;
  color: #15181e;

  &.clicked {
    border-bottom: 3px solid #71cdc7;
    color: #42b5ad;
  }
`;

const TabLinkListElement = styled.li`
  padding: 0 33px;
  height: calc(100% - 3px);
  margin: 0 0 3px;
  font-size: 24px;
  font-weight: 600;
  color: #15181e;
  display: flex;
  justify-content: center;
  align-items: center;

  &.clicked {
    border-bottom: 3px solid #71cdc7;
    color: #42b5ad;
  }
`;

const TabLinkText = styled.li`
  color: inherit;
  text-decoration: inherit;
`;

const SignInWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-left: 61px;
`;

const SignInLink = styled(Link)`
  margin: 15px 0;
  padding: 12px 38px;
  border-radius: 38px;
  color: #fff;
  font-size: 24px;
  background-color: #42b5ad;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Navigation({ path, isLoggedIn }) {
  return (
    <NavigationBar>
      <NavigationWrapper>
        <HomeLinkWrapper>
          <Link to="/welcome">
            <LogoImage src={"images/logo/header_logo.png"} />
          </Link>
        </HomeLinkWrapper>
        <TabLinkWrapper>
          <TabLink to="/">
            <TabLinkListElement className={path === "/" ? "clicked" : ""}>
              <TabLinkText>투자</TabLinkText>
            </TabLinkListElement>
          </TabLink>
          <TabLink to="/mypage">
            <TabLinkListElement className={path === "/mypage" ? "clicked" : ""}>
              <TabLinkText>MY</TabLinkText>
            </TabLinkListElement>
          </TabLink>
          <SignInWrapper>
            <SignInLink to={isLoggedIn ? "/logout" : "/login"}>
              {isLoggedIn ? "로그아웃" : "로그인"}
            </SignInLink>
          </SignInWrapper>
        </TabLinkWrapper>
      </NavigationWrapper>
    </NavigationBar>
  );
}

export default Navigation;
