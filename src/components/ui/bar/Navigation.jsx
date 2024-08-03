import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const NavigationBar = styled.nav`
  display: flex;
  background-color: #fff;
`

const NavigationWrapper = styled.div`
  width: 1532px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const HomeLinkWrapper = styled.ul`
`

const LogoImage = styled.img`
  width: 150px;
  padding: 25px 0;
`

const TabLinkWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
`

const TabLink = styled(Link)`
  margin-left: 61px;
  color: #15181E;

  &.clicked {
    border-bottom: 3px solid #71CDC7;
    color: #42B5AD;
  }
`

const TabLinkListElement = styled.li`
  padding: 0 33px;
  height: calc(100% - 3px);
  margin: 0 0 3px;
  font-size: 24px;
  font-weight: 600;
  color: #15181E;
  display: flex;
  justify-content: center;
  align-items: center;

  &.clicked {
    border-bottom: 3px solid #71CDC7;
    color: #42B5AD;
  }
`

const TabLinkText = styled.li`
  color: inherit;
  text-decoration: inherit;
`

function Navigation({ path }) {
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
            <TabLinkListElement className={ (path === "/") ? "clicked" : "" }>
              <TabLinkText>
                투자
              </TabLinkText>
            </TabLinkListElement>
          </TabLink>
          <TabLink to="/mypage">
            <TabLinkListElement className={ (path === "/mypage") ? "clicked" : "" }>
              <TabLinkText>
                MY
              </TabLinkText>
            </TabLinkListElement>
          </TabLink>
        </TabLinkWrapper>
      </NavigationWrapper>
    </NavigationBar>
  );
}

export default Navigation;
