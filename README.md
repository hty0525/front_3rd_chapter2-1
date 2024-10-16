## 기본과제 진행과정

1. 변수 var -> let or const로 변경
2. document.createElement 대신 createElement 커스텀 함수 사용
   - html 프로퍼티 한번에 적용하도록 함
3. 문자열 ``(백틱)으로 변경
4. 함수
   1. 콜백 익명함수 전부 화살표 함수로 변경
   2. UI 업데이트 함수와 Data 업데이트 함수 분리
5. 고정되서 사용하는 숫자나 문자는 상수로 뺀다
   - const ALL_DISCOUNT_COUNT = 30;
6. 변수명
   1. sel -> select 단축어를 사용하지 않는다
   2. prodList -> products 복수형은 s를 붙인다.
   3. cartDisp -> UI관련 앞에는 ElCartContainer 앞에 El을 붙인다.
   4. sel -> ElProductSelect 어떤 것인지 최대한 자세하게 쓴다.
   5. 마지막을 나타내는 것은 과거형으로 쓴다 ex) selected
   6. 현재 값에 대해서는 current를 붙인다. ex) currentCount
   7. 현재 프로젝트에서는 상품의 금액이란 표현에 더 적합한 price로
   8. 수량을 나타내는 것은 q가 아닌 다양하게 사용할 수 있는 count로 한다.
   9. 유추 할 수 있는 객체는 분해할당한다. ex)products.find(({ id }) => id === targetProductItemId)
7. 함수명
   1. 이벤트 함수는 on + event + event target ex) onClickProductAddButton
   2. 일반 함수는 함수명에서 어떤 동작을 하는지 알아보게 한다.
      - calculatePoint -> 누가봐도 point계산 하는 함수
      - 동사 + 명사로

## 우리의 진행과정

어떻게 우리의 코드 컨벤션을 맞추는지

## 심화과제

우리가 이렇게 코드 컨벤션을 맞춰봤다.

## 느낀점

내가 생각한 클린코드와 우리가 생각한 클린코드를 진행하면서 느낀점
