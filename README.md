# 🐼PandaOffice_front
<br>
<br>

## 🔐 로그인,인사관리
### 🛠 기능설명
-

### 🖼️ 실행화면
<div style="display: inline-block;">
  <img src="https://github.com/user-attachments/assets/72409ac4-2404-436e-8ebf-135c39263448" alt="로그인" width="400" height="250">
  <img src="https://github.com/user-attachments/assets/79ced1a5-b85b-403c-b716-08c5024daf97" alt="인사개인조회" width="400" height="250">
  <img src="https://github.com/user-attachments/assets/e0c11094-0b32-4a27-8ba9-3e8871531fc8" alt="사원등록" width="400" height="250">
  <img src="https://github.com/user-attachments/assets/cbebe8b4-675e-4e89-b66d-2734299bf2fb" alt="개인정보처리방침" width="400" height="250">
  <img src="https://github.com/user-attachments/assets/e341f605-12a5-4487-8e8b-003e966a1f76" alt="로그인"width="400" height="250">
</div>


---
<br>


## 🧾 급여관리
### 🛠 기능설명
- 급여자료입력: 직원에게 지급하는 급여 및 4대보험과 같은 공제금액을 조회하고 입력하는 관리 페이지. 귀속연월은 당월을 기준으로 자동선택되며 급여, 상여, 급여+상여로 구분한다. (지급일은 귀속연월의 25일로 고정됨)
직원 테이블에 원하는 직원을 선택하면 해당 직원의 지급항목과 공제항목이 산출식에 자동계산되어 출력되고 재계산 혹은 수기로 수정할 수 있다.
지급항목 테이블에서 각 지급항목의 과세여부와 총 지급액을 표시하고 공제항목 테이블에선 공제항목의 총액과 차인지급액을 계산하여 표시한다.

- 급여조회: 로그인한 직원의 한달 급여기록을 조회하는 페이지로 해당 직원의 부서, 직급, 급여목록, 은행 정보 등을 확인할 수 있다.
가장 최근에 지급된 기록이 표시되며 지급/공제항목은 급여자료입력 화면과 동일하게 출력된다.

### 🖼️ 실행화면
<div style="display: flex; flex-wrap: wrap;">
      <img src="https://github.com/user-attachments/assets/e5e3414b-94a5-46ee-aac9-c1160f395183" alt="급여자료조회" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/0081dfef-7657-4dff-8aa8-86c9575b0313" alt="급여조회" width="400" height="250">
</div>

### 🖍️어려웠던 점
중첩된 데이터 구조를 처리하는 것이 고민을 많이 했던 부분이였다. DB에서 급여, 지급, 공제 테이블 세 가지로 나뉘어 관리되고 있다..지급, 공제 테이블의 각 카테고리 ID값을 참조하여 항목명과 금액을 매핑시키고 이를 지급항목 테이블에 등록하는 로직구현이 복잡하다고 느껴 구현에 조금 애를 먹었던거 같다.<br>
급여 기록 요청 클래스 내부에 지급, 공제 요청 클래스를 정의하여 각 필드에 데이터를 저장되도록 구현함으로써 해결되어 다행이라 생각한다.

--- 
<br>

## 🕒 근태관리

### 🖼️ 실행화면


<div style="display: inline-block">
      <img src="https://github.com/user-attachments/assets/aeb9477f-26e9-4a41-9188-dcd4ccc24f52" alt="전 사원 연차 내역" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/8b1b94c2-fc4c-4ae1-9f9e-4b6349c7084e" alt="내 연차 내역" width="400" height="250">
</div>
---
<br>

## 💻전자결재

### 🖼️ 실행화면
<div style="display: flex; flex-wrap: wrap;">
      <img src="https://github.com/user-attachments/assets/4aa68b75-6885-4ee1-8e13-98cd519ffb93" alt="전자결재 기안" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/a5e8f029-c0ef-42d2-a8a5-02cfb1d65a0f" alt="전자결재 양식 관리" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/0d16c5fa-f290-47db-90a3-3aca01f75e71" alt="양식 선택" width="400" height="250">
</div>
---
<br>

## 💼 채용면접

### 🖼️ 실행화면
<div style="display: flex; flex-wrap: wrap;">
      <img src="https://github.com/user-attachments/assets/039860cb-cf4f-432b-975f-6adff47931e1" alt="캘린더" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/45e3aca8-3d7d-44f7-a963-8b444c9d3e5c" alt="일정입력" width="400" height="250">
</div>

---
<br>

## 📋 설문조사 

### 🖼️ 실행화면
<div style="display: flex; flex-wrap: wrap;">
      <img src="https://github.com/user-attachments/assets/f86d0dbb-def4-4fe9-99e6-0ed8dff57444" alt="캘린더" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/1a66a58f-eb63-4262-a79c-634e8abbe45b" alt="일정입력" width="400" height="250">
</div>

---
<br>

## 📢공지사항

### 🖼️ 실행화면
<div style="display: flex; flex-wrap: wrap;">
      <img src="https://github.com/user-attachments/assets/42613f3e-875b-4c89-a03f-2e6ff840a1da" alt="캘린더" width="400" height="250">
      <img src="https://github.com/user-attachments/assets/ce132828-63b3-4087-93df-0751359a2ea2" alt="일정입력" width="400" height="250">
</div>





