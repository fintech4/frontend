import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { media } from "../../../media";

const NavigationBar = styled.nav`
  display: flex;
  background-color: #fff;
`;

const NavigationWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 360px;
  display: flex;
  justify-content: space-between;

  ${media.mobile`
    width: 100%;
    padding: 8px 18px;
  `}
`;

const HomeLinkWrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const TabLink = styled(Link)`
  display: block;
`;

const LogoImage = styled.img`
  display: block;
  width: 150px;
  padding: 15px 0;

  ${media.mobile`
    width: 90px;
    padding: 0;
  `}
`;

const MenuMobileWrapper = styled.ul`
  display: none;
  width: 44px;
  height: 44px;
  ${media.mobile`
    display: flex;
    cursor: pointer;
  `}
`;


const MenuMobile = styled.img`
  width: 100%;
`;

const TabLinkPcWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  
  ${media.mobile`
    display: none;
  `}
`;

const TabLinkMobileWrapper = styled.ul`
  display: none;
  
  ${media.mobile`
    &.clicked {
      display: flex;
    }
  `}
`;

const TabLinkPc = styled(Link)`
  margin-left: 61px;
  color: #15181e;

  &.clicked {
    border-bottom: 3px solid #71cdc7;
    color: #42b5ad;
  }
`;

const TabLinkPcListElement = styled.li`
  padding: 0 33px;
  height: calc(100% - 3px);
  margin: 0 0 3px;
  font-size: 22px;
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

const TabLinkPcText = styled.li`
  color: inherit;
  text-decoration: inherit;
`;

const SignInWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-left: 61px;
`;

const SignInLink = styled(Link)`
  margin: 12px 0;
  padding: 10px 38px;
  border-radius: 38px;
  color: #fff;
  font-size: 22px;
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
          <TabLink to="/">
            <LogoImage src={"images/logo/header_logo.png"} />
          </TabLink>
        </HomeLinkWrapper>
        <MenuMobileWrapper>
          <MenuMobile src={"images/hamburger-menu.png"} />
        </MenuMobileWrapper>
        <TabLinkPcWrapper>
          <TabLinkPc to="/main">
            <TabLinkPcListElement className={path === "/main" || path === "/" ? "clicked" : ""}>
              <TabLinkPcText>투자</TabLinkPcText>
            </TabLinkPcListElement>
          </TabLinkPc>
          <TabLinkPc to="/mypage">
            <TabLinkPcListElement className={path === "/mypage" ? "clicked" : ""}>
              <TabLinkPcText>MY</TabLinkPcText>
            </TabLinkPcListElement>
          </TabLinkPc>
          <SignInWrapper>
            <SignInLink to={isLoggedIn ? "/logout" : "/login"}>
              {isLoggedIn ? "로그아웃" : "로그인"}
            </SignInLink>
          </SignInWrapper>
        </TabLinkPcWrapper>
      </NavigationWrapper>
    </NavigationBar>
  );
}

export default Navigation;
