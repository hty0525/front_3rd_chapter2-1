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
   1. sel -> select 축약형을 사용하지 않는다
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

### 시간상 참여 못한 팀원들은 읽어 보고 심화과제에 녹이는 것으로 했습니다!

- 팀원별 리팩토링 방식

  - 태영
    - 전체적인 것 보다, 디테일한 부분을 챙겨서 리팩토링을 함 ( 함수명, 변수명 어떻게 하는지 작은 단위에 집중 )
  - 수빈A
    - 전체적인 틀을 잘 짜서 리팩토링을 함 가장 정석적인 클린코드를 적용함
  - 아람
    - 중요하게 생각하는 부분에 따라 순차 적으로 리팩토링 진행 ( 함수명, 변수명, 역할에 따른 함수 분리 )
  - 단우
    - 너무 많은 부분을 제한 하면, 코드의 자유도가 너무 떨어짐 -> 중요한 부분을 정해서 리팩토링 진행함
  - 영우
    - 클린코드에서 말하는 애로우 펑션, 매직넘버 이런 것들이 정확히 어디에 쓰이는지 공부하며 리팩토링

- 팀원별 리팩토링 꼭 원하는 것
  - 태영
    - 복수형, 단수형, 수량, 가격, 사람, 이런 변수명은 확실히 통일했으면 좋겠다.
    - 함수명은 -> 동사 + 명사, 이벤트 핸들러는 on+event+eventTarget 하면 좋겠다!
  - 수빈 A
    - 해당 파일, 함수에 상단에 어떤 역할을 하는 친구들인지 주석으로 간략하게 남기기
  - 아람
    - var 사용 X let, const 목적에 맞게 정확하게 쓰기
    - 기능에 맞게 엔터 쳐서 그룹핑 하기
    - 이벤트 함수는 -> handle+동사 handleAddProduct
    - 일반 함수 -> 동사 + 명사 addProduct
    - 너무 심한 축약형 사용하지 않기
    - if(isBoolean === true) if문에 들어가는 부분은 무조건 boolean값인데 저렇게 사용하지 않기
  - 단우
    - 의미가 명확한 변수명을 사용하면 좋겠다. 합성어 2~3개 정도
    - if문의 조건이 true falsy 값을 너무 긴 연산으로 적지 않기, 너무 길어지면 변수로 빼기
  - 영우
    - 재사용 가능한 것들은 따로 빼놓자!
  - 진현
    - 함수명을 일관되게 작성 -> 할인이라고 하면 discount, sale 있으면 둘중 하나로 통일
    - 반복문은 for은 최대한 지양하고, HOC(고차함수)를 사용하자!
    - 변하지 않는 값은 상수로 처리
    - 함수는 단 하나의 기능만 정의한다.
- 의견 통일이 필요한 것

  - event 핸들러를 어떻게 할것인가!
    1. on + event + target -> onClickProductAddButton
       - 태영 : react에서 조차 event 핸들러를 추가하려면 on+event를 사용한다.
         그렇기에 훨씬 직관적이다!
       - 영우 : 직관적이어서 더 좋다
    2. handle + 동사
       - 아람 : on 방식 좋은데, 너무 길어지는 경우가 종종 있다.
    3. handle과 on을 상황에 따라 쓴다!
       - 단우 : 가벼운 이벤트는 on에서 처리, 무거운 이벤트는 handle 사용
       - 진현 : 단우님 말에 설득 되었다. 좋다!
       - 수빈 : 단우님에게 설득 되었다.
  - 결론 우리 과제에서는?
    - handle - 아람, 단우, 수빈, 영우, 진현 당첨!
    - on - 태영

## 심화과제

### 1. 네이밍 규칙

- **복수형, 단수형, 수량, 가격, 사람**등 같은 의미를 가진 단어는 하나로 통일하여 사용합니다.
  - 이번 과제에서
    - 가격 -> price
    - 수량 -> quantity
    - 총 가격 -> totalAmount (수량 X 가격 = amount라고 대부분 함)
- **축약형은 사용하지 않는다** cnt -> count 전부 노 축약
- **함수명**: `동사 + 명사` 형식으로 작성합니다. (예: `addProduct`)
- **이벤트 핸들러**: `handle + 동사 + 타겟` 형식으로 작성합니다. (예: `handleAddProductButton`)
  - 타겟까지 붙여주기

### 2. 주석

- 각 파일 또는 함수 상단에 해당 파일/함수의 역할을 간략히 설명하는 주석을 추가합니다. jsDoc 권장 ^^ - 수빈A

### 3. 변수 및 상수

- `var`를 사용하지 않습니다. 대신, `let`과 `const`를 목적에 맞게 정확하게 사용합니다.
- **변수명**은 의미가 명확하고, 2~3개의 단어로 구성된 이름을 사용합니다.
- 변하지 않는 값은 **상수**로 정의합니다.

### 4. 함수 작성 규칙

- **이벤트 함수**: `handle + 동사 + 타겟` 형식으로 작성합니다. (예: `handleAddProductButton`)
- **일반 함수**: `동사 + 명사 ` 형식으로 작성합니다. (예: `addProduct`)
- 함수는 **단일 책임 원칙**을 따르며, 하나의 기능만 수행합니다.

### 5. 조건문

- `if(isBoolean === true)`와 같은 불필요한 조건문을 지양하고, `boolean` 값만 바로 사용합니다.
- `if`문의 조건이 너무 길어지면, 조건을 변수로 분리하여 사용합니다.
- `if`에 축약 없이 `{}`를 항상 붙여준다

### 6. 반복문

- `for`문은 가급적 지양하고, 대신 **고차 함수(Higher-Order Functions)** 를 사용합니다.

### 7. 코드 구성

- 관련된 기능끼리는 **엔터**로 구분하여 그룹화합니다.
- 재사용 가능한 코드는 **별도의 파일**로 분리하여 관리합니다.

## 느낀점
