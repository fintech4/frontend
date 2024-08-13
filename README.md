# 📈 초보자를 위한 주식모의투자 서비스 "TOOU"

- 배포 URL : https://www.toou.site
- Test ID : toou-1, toou-2, toou-3, toou-4, toou-5
- Test PW : 자유롭게 기입

<br>

## 프로젝트 소개

- 초보자를 위한 주식 모의 투자 서비스입니다.
- 손쉽게 주식 종목 주가정보와 주식관련 용어를 알아 볼 수 있습니다.
- 매수, 매도를 지원하고, 보유 종목을 확인할 수 있습니다.

<br>

## 1. 개발 환경

- Front : HTML, React, styled-components
- Back-end : Java SpringBoot
- 버전 및 이슈관리 : Github
- 협업 툴 : Github, Notion, Slack, Figma
- 서비스 배포 환경 : Netlify
- 디자인 : [Figma](https://www.figma.com/design/6DM11s2CklrNIxiVFDDfEj/%F0%9F%92%9A-%ED%95%80%ED%85%8C%ED%81%AC-%ED%95%B4%EC%BB%A4%ED%86%A4-4%EC%A1%B0-%F0%9F%92%9A?node-id=927-21334&m=dev)
- Git 컨벤션 : [Git 컨벤션](https://www.notion.so/coli-pasta/Git-b52748fe66b64637b4b15407a8b86bcf)

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

### 5. **styled-components**

- **설명**: Css-in-Js 라이브러리인 `styled-components`를 활용했습니다. 스타일과 컴포넌트 로직을 한 곳에서 관리할 수 있어 유지보수가 용이하며, 각 컴포넌트에 고유한 클래스 이름을 자동으로 생성하여 스타일이 전역에 영향을 미치지 않도록 합니다.
- **주요 기능**:
    - 스타일링, 동적 스타일링, 확장 스타일링
 
### 6. **Responsive**

- **설명**: MainPage, WelcomePage, MyPage를 반응형으로 구현하였습니다. styled-components와 같은 CSS-in-JS 라이브러리와 미디어 쿼리(Media Query)를 사용하였습니다.
- **주요 기능**: 미디어 쿼리 사용(모바일 기기 767px 이하)
  

### 7. **API 호출 및 데이터 관리**
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
