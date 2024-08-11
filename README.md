# 📖 초보자를 위한 주식모의투자 서비스 "TOOU" README

- 배포 URL : https://main--cerulean-smakager-d65d2c.netlify.app/
- Test ID : toou-1, toou-2, toou-3, toou-4, toou-5
- Test PW : 자유롭게 기입

<br>

## 프로젝트 소개

- README는 책을 좋아하는 사람들이 자신의 책 취향을 공유하고, 다 읽은 책을 판매할 수 있는 SNS입니다.
- 개인의 프로필 페이지에 좋아하는 구절 등 책에 대한 정보를 작성하고 판매하고 싶은 책을 등록할 수 있습니다.
- 검색을 통해 책 취향이 비슷한 다른 유저들의 피드를 구경할 수 있습니다.
- 다양한 유저들을 팔로우하며 마음에 드는 게시글에 좋아요를 누르거나 댓글을 작성할 수 있습니다.

<br>

## 1. 개발 환경

- Front : HTML, React, styled-components, Recoil
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Discord, Notion, Github Wiki
- 서비스 배포 환경 : Netlify
- 디자인 : [Figma](https://www.figma.com/file/fAisC2pEKzxTOzet9CfqML/README(oh-my-code)?node-id=39%3A1814)
- [커밋 컨벤션](https://github.com/likelion-project-README/README/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [코드 컨벤션](https://github.com/likelion-project-README/README/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [스프라이트](https://github.com/likelion-project-README/README/wiki/%EC%8A%A4%ED%94%84%EB%9D%BC%EC%9D%B4%ED%8A%B8)
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### 1. **React (리액트)**

- **설명**: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리 리액트를 활용하였습니다. 컴포넌트로 UI들을 독립적으로 관리하고, JSX 문법으로 UI를 정의하였습니다.

### 2. **React Hooks (리액트 훅스)**

- **설명**: 함수형 컴포넌트에서 상태 관리 및 생명주기 메서드를 사용할 수 있도록 React Hooks를 활용했습니다.
- **주요 훅**:
    - **useState**: 컴포넌트의 상태를 선언하고 관리합니다.
    - **useEffect**: 사이드 이펙트(예: 데이터 fetching, DOM 업데이트 등)를 관리합니다.

### 3. **Context API (컨텍스트 API)**
- **설명**: React 애플리케이션에서 전역 상태를 관리할 수 있도록 Context API를 활용했습니다. (StockBar, Chart, Order, Wallet) 컴포넌트의 상태를 동적으로, 전역으로 함께 관리하였습니다.
- **주요 요소**:
    - **createContext**로 객체를 생성하고, **Provider**로 하위 컴포넌트에 컨텍스트 값을 제공하였습니다.각 **Consumer** 컴포넌트들은 컨텍스트의 값을 소비합니다. 

### 4. **axios**
- **설명**: 브라우저와 Node.js 환경에서 HTTP 요청을 보내고 응답을 처리하기 위한 라이브러리입니다. Promise 기반으로 동작합니다.
- **주요 기능**:
    - **HTTP 요청**: GET, POST, PUT, DELETE 등의 요청을 보낼 수 있습니다.
    - **응답 처리**: 응답 데이터를 변형하거나 에러를 처리할 수 있습니다.

### 5. **API 호출 및 데이터 관리**
- **설명**: 웹 애플리케이션에서 외부 API와 통신하여 데이터를 가져오고 이를 상태로 관리합니다. 데이터 fetching, 상태 관리, 에러 처리 등이 포함됩니다.
- **기술**:
    - **비동기 프로그래밍**: `async`와 `await`를 사용하여 비동기 HTTP 요청을 처리합니다.
    - **상태 관리**: React의 `useState`, `useEffect`를 사용하여 API 호출로부터 가져온 데이터를 관리합니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main 브랜치와 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서 사용하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.
    - **Fix** 코드를 디버깅하고, 보수하기 위해 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 3. 프로젝트 구조

```
│  App.jsx
│  index.js
│  media.js
│  setupProxy.js
│
├─assets
│  └─css
│          styles.css
│
├─components
│  ├─chart
│  │      CandleChart.jsx
│  │
│  ├─page
│  │      LoginPage.jsx
│  │      MainPage.jsx
│  │      MyPage.jsx
│  │      WelcomePage.jsx
│  │
│  └─ui
│      │  Calendar.jsx
│      │  ChartComponent.jsx
│      │  Guide.jsx
│      │  OrderForm.jsx
│      │  SearchContainer.jsx
│      │  StockList.jsx
│      │  Wallet.jsx
│      │
│      ├─bar
│      │      Navigation.jsx
│      │      StockSearch.jsx
│      │
│      ├─buttons
│      │      Button.js
│      │      Input.js
│      │      Table.js
│      │
│      ├─modal
│      │      BuyModal.jsx
│      │      ErrorModal.jsx
│      │
│      └─tables
│              MyTable.jsx
│              StockTable.jsx
│
├─context
│      stocksContext.js
│
├─models
│      AccountAssets.js
│      AccountUsers.js
│      Holdings.js
│      Stocks.js
│      StocksHistory.js
│
└─stockData
        chartData.js
```

<br>
