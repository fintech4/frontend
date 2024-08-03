import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const NavigationBar = styled.nav`
`

const NavigationWrapper = styled.div`
`

const HomeLinkWrapper = styled.ul`
`

const LogoImage = styled.img`
  
`

const TabLinkWrapper = styled.ul`
`

const TabLinkListElement = styled.li`
`

const TabLinkText = styled.li`
`

function Navigation() {
  return (
    <NavigationBar>
      <NavigationWrapper>
        <HomeLinkWrapper>
          <Link to="/welcome">
            <LogoImage src={"images/logo/header_logo.png"} />
          </Link>
        </HomeLinkWrapper>
        <TabLinkWrapper>
          <TabLinkListElement>
            <Link to="/">
              <TabLinkText>
                투자
              </TabLinkText>
            </Link>
          </TabLinkListElement>
          <TabLinkListElement>
            <Link to="/mypage">
              <TabLinkText>
                MY
              </TabLinkText>
            </Link>
          </TabLinkListElement>
        </TabLinkWrapper>
      </NavigationWrapper>
    </NavigationBar>
  );
}

export default Navigation;
