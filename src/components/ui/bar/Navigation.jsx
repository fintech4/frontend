import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { media } from "../../../media";
import { useNavigate } from "react-router-dom";

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

const TabLinkPcWrapper = styled.ul`
  display: flex;
  justify-content: space-between;

  ${media.mobile`
    display: none;
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

const SignInPcWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-left: 61px;
`;

const SignInPcLink = styled(Link)`
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
  position: relative;
  width: 100%;
`;

const TabLinkMobileWrapper = styled.ul`
  position: absolute;
  top: 60px;
  right: 0;
  box-shadow: 0px 4px 10px 1px rgba(113, 205, 199, 0.3);
  background-color: #fff;
`;

const TabLinkMobile = styled(Link)`
  display: block;
  color: #15181e;
`;

const TabLinkMobileListElement = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 88px;
  font-size: 16px;
  font-weight: 600;
  color: #15181e;
`;

const TabLinkMobileText = styled.li`
  color: inherit;
  text-decoration: inherit;
`;

const SignInMobileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SignInMobileLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  margin: 12px 0;
  padding: 10px 0;
  border-radius: 38px;
  color: #fff;
  font-size: 16px;
  background-color: #42b5ad;
`;

function Navigation({ path, isLoggedIn }) {
  const [mobileMenuClicked, setMobileMenuClicked] = useState(false);

  const handleClickMobileMenu = () => {
    setMobileMenuClicked(!mobileMenuClicked);
  };

  console.log(path);
  console.log(isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    navigate("/"); // 로그아웃 후 로그인 페이지로 리다이렉트
  };

  return (
    <NavigationBar>
      <NavigationWrapper>
        <HomeLinkWrapper>
          <TabLink to="/">
            <LogoImage src={"images/logo/header_logo.png"} />
          </TabLink>
        </HomeLinkWrapper>
        {/* PC 너비에서만 노출됨 */}
        <TabLinkPcWrapper>
          <TabLinkPc to="/main">
            <TabLinkPcListElement
              className={path === "/main" || path === "/" ? "clicked" : ""}
            >
              <TabLinkPcText>투자</TabLinkPcText>
            </TabLinkPcListElement>
          </TabLinkPc>
          <TabLinkPc to="/mypage">
            <TabLinkPcListElement
              className={path === "/mypage" ? "clicked" : ""}
            >
              <TabLinkPcText>MY</TabLinkPcText>
            </TabLinkPcListElement>
          </TabLinkPc>
          <SignInPcWrapper>
            <SignInPcLink
              to={isLoggedIn ? "/" : "/login"}
              onClick={handleLogout}
            >
              {isLoggedIn ? "로그아웃" : "로그인"}
            </SignInPcLink>
          </SignInPcWrapper>
        </TabLinkPcWrapper>
        <MenuMobileWrapper onClick={handleClickMobileMenu}>
          <MenuMobile
            src={
              mobileMenuClicked
                ? "images/hamburger-close.png"
                : "images/hamburger-menu.png"
            }
          />
        </MenuMobileWrapper>
        {/* Mobile 너비에서만, 햄버거 메뉴 클릭되면 노출됨 */}
        {mobileMenuClicked && (
          <>
            <TabLinkMobileWrapper>
              <SignInMobileWrapper>
                <SignInMobileLink
                  to={isLoggedIn ? "/" : "/login"}
                  onClick={handleLogout}
                >
                  {isLoggedIn ? "로그아웃" : "로그인"}
                </SignInMobileLink>
              </SignInMobileWrapper>
              <TabLinkMobile to="/main">
                <TabLinkMobileListElement
                  className={path === "/main" || path === "/" ? "clicked" : ""}
                >
                  <TabLinkMobileText>투자</TabLinkMobileText>
                </TabLinkMobileListElement>
              </TabLinkMobile>
              <TabLinkMobile to="/mypage">
                <TabLinkMobileListElement
                  className={path === "/mypage" ? "clicked" : ""}
                >
                  <TabLinkMobileText>MY</TabLinkMobileText>
                </TabLinkMobileListElement>
              </TabLinkMobile>
            </TabLinkMobileWrapper>
          </>
        )}
      </NavigationWrapper>
    </NavigationBar>
  );
}

export default Navigation;
