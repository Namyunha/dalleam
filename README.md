# 🎆 같이 달램

![readme_mockup2](https://velog.velcdn.com/images/yeonna18k/post/e42bf06c-fb1c-4cba-8a30-d80a0c394cf1/image.png)

<br>

- 배포 URL : https://dalleam-black.vercel.app/

<br>

## 프로젝트 소개

- 유저가 바쁜 일상 속 휴식을 위한 다양한 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 생성할 수 있는 서비스입니다.

<br>

## 개발 기간

- 전체 개발 기간 : 2024.09 ~ 2024.10. (2개월)

<br>

## 팀원 구성

<div align="center">

|                                                              **남윤하**                                                               |                                                                **오동혁**                                                                |                                                             **조성훈**                                                             |                                                               **김시몬**                                                               |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/108773845?v=4" height=150 width=150> <br/> @Namyunha](https://github.com/Namyunha) | [<img src="https://avatars.githubusercontent.com/u/65821619?v=4" height=150 width=150> <br/> @ohdong9795](https://github.com/ohdong9795) | [<img src="https://avatars.githubusercontent.com/u/87121448?v=4" height=150 width=150> <br/> @shchoon](https://github.com/shchoon) | [<img src="https://avatars.githubusercontent.com/u/77772647?v=4" height=150 width=150> <br/> @Simon1476](https://github.com/Simon1476) |
|                                               **모임 만들기, 리뷰 목록, 코드 리팩토링**                                               |                                                           **회원가입, 로그인**                                                           |                                                           **마이페이지**                                                           |                                                              **모임목록**                                                              |
|                                                   Button, Calendar, Tab, ReviewCard                                                   |                                                             Input, Dropdown                                                              |                                                           Gathering Card                                                           |                                                                 Modal                                                                  |

</div>

<br>

## 기술 스택

### **프로그래밍 언어**

- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=black&style=flat-square)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=white&style=flat-square)

### **프레임워크**

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=black&style=flat-square)
- ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white&style=flat-square)

### **상태 관리**

- ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?logo=React%20Query&logoColor=white&style=flat-square)
- ![Zustand](https://img.shields.io/badge/-Zustand-FFDD00?style=flat-square&logoColor=black)

### **라이브러리**

- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?style=flat-square&logo=react&logoColor=white)

### **테스트 도구**

- ![Jest](https://img.shields.io/badge/-Jest-C21325?logo=Jest&logoColor=white&style=flat-square)
- ![React Testing Library](https://img.shields.io/badge/-React%20Testing%20Library-E33332?logo=testing-library&logoColor=white&style=flat-square)

### **스타일링 및 애니메이션**

- ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white&style=flat-square)
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)

<br>

## 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
  - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
  - **dev** 브랜치는 개발 단계에서 git-flow의 main 역할을 하는 브랜치입니다.
  - **feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 실행 방법

### 저장소 클론

git clone https://github.com/Namyunha/dalleam.git

### 새 터미널 창에서 프론트엔드 실행

npm run build <br>
npm install <br>
npm start
<br>

## 페이지 시연

### 남윤하

| 모임 만들기, 리뷰 목록, 찜한 모임 |
| --------------------------------- |

- 모임만들기
  ![모임 만들기](https://github.com/user-attachments/assets/b2f55ab2-6663-45e1-b085-91c8e13fa85e)
  **1. 리액트 캘린더 적용 <br>**
  **2. react-hook-form을 이용해 유효성 검사 및 입력한 데이터 가져오기**

- 리뷰 목록
  ![리뷰 목록 2](https://github.com/user-attachments/assets/049bef3b-e43a-4ff0-afc5-1707b856a352) <br>
  ![리뷰 목록 1](https://github.com/user-attachments/assets/bed2dfc8-b8cd-4317-af6c-21202f12502f)

  1. 무한 스크롤로 리뷰목록 불러오기 (SSR로 받아온 데이터를 클라이언트 컴포넌트에서 나타내기)
     <br>
  1. Promise.All을 이용해서 리뷰 점수와 리뷰목록을 동시에 prefetch
     <br>
  1. 로딩시 리액트 스켈레톤 구현
     <br>

- 찜한 목록
  ![alt text](<모임 찜1-1.gif>)
  ![alt text](<모임 찜 2.gif>)

1. zustand를 이용해서 찜 목록 구현
2. 회원일 때, 비회원일 때 찜 했을 때, 기능 차이 구현

### 김시몬

| 초기화면 |
| -------- |

- 모임목록 불러오기 (무한 스크롤 적용)
  ![모임 무한스크롤 적용](https://github.com/user-attachments/assets/d7586c97-97b2-4518-b21e-bb320f06a7b6)

- 메인화면 (**찜하기는 남윤하 구현**)
  ![메인화면](https://github.com/user-attachments/assets/00eaf310-a473-433a-bee5-76c7f0975659)

### 오동혁

| 로그인, 회원가입 |
| ---------------- |

- 회원가입 하기
  ![회원가입](https://github.com/user-attachments/assets/63ff7e53-397c-4454-801d-ff4015b49042)

- 로그인 하기
  ![로그인](https://github.com/user-attachments/assets/5896c093-6815-497c-9432-8f28dbe131d6)
