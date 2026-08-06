# IA (Information Architecture)

# HobbyFind - 취미 탐색 웹서비스

---

# 1. 전체 사이트맵 구조 (Site Map)

```text
HobbyFind
│
├── Home (/)
│   ├── Hero Section
│   ├── Category Filter
│   ├── Hobby Card Grid
│   └── Top Bar
│
├── Category
│   ├── Sports (/category/sports)
│   ├── Intelligence (/category/intelligence)
│   └── Art (/category/art)
│
├── Login (/login)
│
├── Sign Up (/signup)
│
└── My Page (/mypage) [회원 전용]
    ├── Bookmark List
    └── Statistics
```

---

# 2. 사용자 흐름 (User Flow)

## 2.1 비회원(User Flow)

```text
홈 접속
    │
    ▼
취미 탐색
    │
    ├── 카테고리 선택
    │       │
    │       ▼
    │   카테고리 페이지
    │
    └── 로그인 필요 기능 선택
            │
            ▼
        로그인 페이지
            │
            ├── 로그인 성공
            │       │
            │       ▼
            │   마이페이지
            │
            └── 회원가입 이동
```

---

## 2.2 회원(User Flow)

```text
로그인
    │
    ▼
홈
    │
    ├── 취미 탐색
    │
    ├── 북마크 추가/해제
    │
    └── 마이페이지
            │
            ├── 북마크 확인
            └── 통계 확인
```

---

# 3. 내비게이션 구조 (Navigation Structure)

## Top Bar

### 공통 요소

| 요소   | 설명                     |
| ---- | ---------------------- |
| Logo | 홈("/") 이동              |
| 운동형  | /category/sports       |
| 지능형  | /category/intelligence |
| 예술형  | /category/art          |

---

### 비회원 상태

```text
Logo

운동형
지능형
예술형

로그인
회원가입
```

---

### 회원 상태

```text
Logo

운동형
지능형
예술형

마이페이지
로그아웃
```

---

## Footer

간단한 정보 제공용 Footer를 포함한다.

구성

* 서비스명
* Copyright

---

# 4. 페이지 계층 구조 (Page Hierarchy)

## Home (/)

```text
Home
│
├── Top Bar
│
├── Hero
│
├── Category Filter
│
├── Hobby Card Grid
│    ├── Hobby Card
│    ├── Hobby Card
│    └── Hobby Card
│
└── Footer
```

---

## Category

```text
Category Page
│
├── Top Bar
│
├── Category Header
│    ├── 제목
│    └── 소개문구
│
├── Hobby Card Grid
│
└── Footer
```

---

## Login

```text
Login
│
├── Top Bar
│
├── Login Form
│
├── Error Message
│
├── Login Button
│
├── Signup Link
│
└── Footer
```

---

## Signup

```text
Signup
│
├── Top Bar
│
├── Signup Form
│
├── Terms Checkbox
│
├── Signup Button
│
├── Login Link
│
└── Footer
```

---

## My Page

```text
My Page
│
├── Top Bar
│
├── Bookmark List
│
├── Statistics
│
└── Footer
```

---

# 5. 페이지별 주요 콘텐츠 구성 (Content Organization)

| 페이지      | 주요 콘텐츠                                 |
| -------- | -------------------------------------- |
| Home     | Hero, Category Filter, Hobby Card Grid |
| Category | 카테고리 제목, 소개문구, Hobby Card Grid         |
| Login    | 로그인 폼, 에러 메시지, 회원가입 링크                 |
| Signup   | 회원가입 폼, 약관 동의, 로그인 링크                  |
| MyPage   | 북마크 리스트, 통계 차트                         |

---

## Hobby Card 구성

각 카드에는 다음 정보를 표시한다.

| 요소     | 설명              |
| ------ | --------------- |
| 취미명    | 취미 이름           |
| 카테고리   | 운동형 / 지능형 / 예술형 |
| 북마크 버튼 | 회원만 활성화         |

---

# 6. 상호작용 패턴 (Interaction Patterns)

## 6.1 카테고리 메뉴

```text
카테고리 선택

↓

카테고리 페이지 이동

↓

선택 카테고리 취미만 표시
```

---

## 6.2 홈 필터 토글

```text
전체

↓

운동형 선택

↓

운동형 카드만 표시
```

동일하게

* 지능형
* 예술형

동작 지원

---

## 6.3 북마크 버튼

회원

```text
빈 북마크

↓

클릭

↓

북마크 저장

↓

아이콘 활성화
```

다시 클릭

↓

북마크 제거

---

비회원

```text
북마크 클릭

↓

로그인 페이지 이동
```

---

## 6.4 로그인

실패

```text
아이디 또는 비밀번호 오류

↓

Error Message 표시
```

성공

```text
Home 이동

↓

회원 메뉴 활성화
```

---

## 6.5 로그아웃

```text
로그아웃 클릭

↓

세션 종료

↓

비회원 메뉴 표시

↓

Home
```

---

## 6.6 마이페이지

회원

```text
마이페이지 클릭

↓

북마크 조회

↓

통계 차트 표시
```

비회원

```text
URL 직접 접근

↓

로그인 페이지 이동
```

---

# 7. URL 구조 (URL Structure)

| URL                    | 설명    |
| ---------------------- | ----- |
| /                      | 홈     |
| /login                 | 로그인   |
| /signup                | 회원가입  |
| /mypage                | 마이페이지 |
| /category/sports       | 운동형   |
| /category/intelligence | 지능형   |
| /category/art          | 예술형   |

---

# 8. 컴포넌트 계층 구조 (Component Hierarchy)

```text
App
│
├── Layout
│   ├── TopBar
│   └── Footer
│
├── HomePage
│   ├── HeroSection
│   ├── CategoryFilter
│   └── HobbyCardGrid
│        └── HobbyCard
│             └── BookmarkButton
│
├── CategoryPage
│   ├── CategoryHeader
│   └── HobbyCardGrid
│
├── LoginPage
│   └── LoginForm
│
├── SignupPage
│   └── SignupForm
│
└── MyPage
    ├── BookmarkList
    ├── HobbyCardGrid
    └── StatsChart
```

---

# 9. 상단바/하단바 구성

## Top Bar

| 요소    | 로그인 전 | 로그인 후 |
| ----- | ----- | ----- |
| 로고    | O     | O     |
| 운동형   | O     | O     |
| 지능형   | O     | O     |
| 예술형   | O     | O     |
| 로그인   | O     | X     |
| 회원가입  | O     | X     |
| 마이페이지 | X     | O     |
| 로그아웃  | X     | O     |

### 동작

* **로고** → `/`
* **카테고리 메뉴** → `/category/{type}`
* **로그인** → `/login`
* **회원가입** → `/signup`
* **마이페이지** → `/mypage`
* **로그아웃** → 세션 종료 후 `/`

---

## Footer

모든 페이지에 공통으로 표시한다.

| 요소              | 설명            |
| --------------- | ------------- |
| 서비스명(HobbyFind) | 브랜드 표시        |
| 저작권 문구          | `© HobbyFind` |

---

# 10. 기술 스택 고려 (Next.js 기반)

## 디렉터리 구조 (App Router 기준)

```text
app
│
├── layout.tsx
├── page.tsx                  (/)
│
├── login
│   └── page.tsx
│
├── signup
│   └── page.tsx
│
├── mypage
│   └── page.tsx
│
├── category
│   └── [type]
│       └── page.tsx
│
├── components
│   ├── TopBar.tsx
│   ├── Footer.tsx
│   ├── CategoryMenu.tsx
│   ├── CategoryFilter.tsx
│   ├── HeroSection.tsx
│   ├── HobbyCardGrid.tsx
│   ├── HobbyCard.tsx
│   ├── BookmarkButton.tsx
│   ├── BookmarkList.tsx
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── StatsChart.tsx
│
├── data
│   └── hobbies.ts
│
├── types
│   └── hobby.ts
│
└── utils
    └── auth.ts
```

---

# 고정 취미 데이터 구조

| 카테고리                 | 취미 목록                                  |
| -------------------- | -------------------------------------- |
| 운동형 (`sports`)       | 조깅/러닝, 요가, 수영, 자전거, 클라이밍, 댄스           |
| 지능형 (`intelligence`) | 독서, 퍼즐, 체스, 프로그래밍, 외국어 학습, 사진 촬영       |
| 예술형 (`art`)          | 그림 그리기, 악기 연주, 요리, 서예, 도자기 만들기, 정원 가꾸기 |

> 위 취미 데이터는 실습 프로젝트 요구사항에 따라 **고정 데이터**로 사용하며, 추가·수정·삭제하지 않는다.
