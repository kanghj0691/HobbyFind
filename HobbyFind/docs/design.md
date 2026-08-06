# HobbyFind 디자인 가이드 (Design Guide)

**Design Reference:** Airbnb Design System & UI Style
**Framework:** Next.js + Tailwind CSS

---

# 1. 디자인 시스템 개요 (Design System Overview)

## 1.1 브랜드 아이덴티티

### 브랜드 키워드

* Simple
* Friendly
* Clean
* Discover
* Comfortable

HobbyFind는 다양한 취미를 **부담 없이 탐색하고 저장할 수 있는 경험**을 제공하는 서비스이다. 전체 UI는 Airbnb의 디자인 철학처럼 **넓은 여백, 둥근 모서리, 부드러운 그림자, 직관적인 인터랙션**을 중심으로 구성한다.

---

## 1.2 UI 톤앤매너

| 항목      | 가이드                 |
| ------- | ------------------- |
| 디자인 스타일 | 미니멀 & 카드 중심         |
| 분위기     | 밝고 따뜻함              |
| 여백      | 넉넉한 Spacing 사용      |
| 아이콘     | Outline 스타일         |
| 카드      | 둥근 Radius + Shadow  |
| 애니메이션   | 자연스럽고 짧은 Transition |
| 버튼      | Rounded + Filled    |

---

## 1.3 키 비주얼 가이드

### Hero

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

당신에게 맞는 새로운 취미를 찾아보세요.

운동 · 지능 · 예술

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

* 충분한 상하 여백 (`py-24`)
* 중앙 정렬
* 심플한 타이포그래피
* 배경은 White

---

# 2. TailwindCSS 색상 팔레트 (Color Palette)

## 2.1 브랜드 컬러

| 용도            | 색상      | Tailwind   |
| ------------- | ------- | ---------- |
| Primary       | #FF385C | `rose-500` |
| Primary Hover | #E11D48 | `rose-600` |
| Secondary     | #F7F7F7 | `gray-100` |
| Accent        | #00A699 | `teal-500` |

---

## 2.2 Neutral

| 용도         | 색상       |
| ---------- | -------- |
| Background | white    |
| Surface    | gray-50  |
| Border     | gray-200 |
| Divider    | gray-100 |

---

## 2.3 Text

| 용도          | Tailwind |
| ----------- | -------- |
| Title       | gray-900 |
| Body        | gray-700 |
| Description | gray-500 |
| Disabled    | gray-400 |

---

## 2.4 Button

| 상태        | 클래스                               |
| --------- | --------------------------------- |
| Primary   | `bg-rose-500 text-white`          |
| Hover     | `hover:bg-rose-600`               |
| Secondary | `bg-white border border-gray-300` |
| Disabled  | `bg-gray-200 text-gray-400`       |

---

## Tailwind 변수 예시

```js
colors: {
  primary: "#FF385C",
  secondary: "#F7F7F7",
  accent: "#00A699",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: "#1F2937",
}
```

---

# 3. 페이지 구현 가이드 (Page Implementations)

## 3.1 Home (/)

### 레이아웃

```
Header

Hero

Category Filter

Hobby Grid

Footer
```

---

### Hero

구성

* 제목
* 설명

Tailwind

```html
<section class="py-24 text-center">
```

제목

```html
text-5xl font-bold
```

설명

```html
text-gray-500 mt-4
```

---

### Category Filter

Airbnb Category UI 참고

```
운동형

지능형

예술형
```

Tailwind

```html
flex gap-4 justify-center
```

선택 상태

```html
bg-black
text-white
```

비선택

```html
bg-white
hover:bg-gray-100
```

---

### Hobby Grid

```html
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-8
```

---

## 3.2 Category Page

상단

```
카테고리명

간단 소개
```

본문

```
Grid

취미 카드만 표시
```

회원일 경우

카드 우측 상단

```
Bookmark
```

노출

---

## 3.3 Login

구성

```
Logo

Login Card

Footer
```

Card

```html
max-w-md
mx-auto
rounded-2xl
shadow-lg
```

입력창

```html
rounded-xl
border
```

---

## 3.4 Signup

Login과 동일

추가

```
비밀번호 확인

약관 동의
```

---

## 3.5 MyPage

```
Bookmark List

Statistics

Footer
```

상단

```
내가 저장한 취미
```

하단

```
Pie Chart

또는

Bar Chart
```

---

# 4. 레이아웃 컴포넌트 (Layout Components)

## 4.1 Header

높이

```
72px
```

구성

```
Logo

Category Menu

Auth Buttons
```

Tailwind

```html
sticky
top-0
bg-white
border-b
```

---

## 4.2 Footer

구성

```
HobbyFind

Copyright
```

Tailwind

```html
py-10
text-center
text-gray-500
```

---

## 4.3 Card

```
Image Area (선택 사항 없이 여백 영역)

취미명

카테고리

Bookmark
```

스타일

```html
rounded-2xl
border
shadow-sm
hover:shadow-lg
transition
```

---

## 4.4 Grid

Desktop

```
4 Columns
```

Tablet

```
2 Columns
```

Mobile

```
1 Column
```

---

## 4.5 Category Filter

스타일

```html
rounded-full
border
px-5
py-2
```

Hover

```html
bg-gray-100
```

Selected

```html
bg-black
text-white
```

---

# 5. 상호작용 패턴 (Interaction Patterns)

## Button

Hover

```css
transition-all
duration-200
```

Pressed

```css
scale-95
```

---

## Category Filter

Hover

```
Background Fade
```

Selected

```
Black Fill

White Text
```

Transition

```
200ms
```

---

## Hobby Card

Hover

```
Shadow 증가

살짝 확대

scale-105
```

Tailwind

```html
hover:shadow-xl
hover:scale-[1.02]
transition
```

---

## Bookmark

기본

```
Outline
```

선택

```
Rose Color Fill
```

Transition

```
opacity

scale
```

---

## 페이지 전환

Next.js Route Transition

```
Fade

150~250ms
```

---

## 모바일

카드

```
Touch Feedback
```

버튼

```
44px 이상
```

필터

```
가로 스크롤 허용
```

```html
overflow-x-auto
```

---

## 데스크톱

Hover 효과 적극 활용

```
Card

Button

Filter
```

마우스 Cursor

```
pointer
```

---

# 6. 반응형 브레이크포인트 (Breakpoints)

| 해상도         | Tailwind       | 레이아웃             |
| ----------- | -------------- | ---------------- |
| Mobile      | `<640px`       | 1열 카드, 필터 가로 스크롤 |
| Small       | `sm (640px)`   | 2열 카드            |
| Medium      | `md (768px)`   | 2~3열 카드          |
| Large       | `lg (1024px)`  | 3열 카드            |
| Extra Large | `xl (1280px)`  | 4열 카드            |
| 2XL         | `2xl (1536px)` | 4열 카드 + 넓은 여백    |

### 반응형 컨테이너

```html
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

### 카드 그리드

```html
<div
  class="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-6
  "
>
```

---

# 공통 디자인 토큰

| 항목                 | 권장 값                                     |
| ------------------ | ---------------------------------------- |
| Border Radius      | `rounded-xl` ~ `rounded-2xl`             |
| Shadow             | `shadow-sm`, `hover:shadow-lg`           |
| Transition         | `duration-200 ease-in-out`               |
| Container          | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Card Padding       | `p-5` ~ `p-6`                            |
| Section Spacing    | `py-16` ~ `py-24`                        |
| Grid Gap           | `gap-6` ~ `gap-8`                        |
| Button Height      | `h-11` 이상                                |
| Interactive Target | 최소 `44 × 44px`                           |

## 고정 데이터 및 범위

* 취미 목록은 **운동형(조깅/러닝, 요가, 수영, 자전거, 클라이밍, 댄스)**, **지능형(독서, 퍼즐, 체스, 프로그래밍, 외국어 학습, 사진 촬영)**, **예술형(그림 그리기, 악기 연주, 요리, 서예, 도자기 만들기, 정원 가꾸기)**의 총 18개로 고정한다.
* 디자인은 해당 범위의 기능(탐색, 로그인/회원가입, 북마크, 마이페이지)에 맞춰 구성하며, 추가 기능을 전제로 하는 UI는 포함하지 않는다.
