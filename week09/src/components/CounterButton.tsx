import { useCounterActions } from "../stores/counterStore"

export default function CounterButton() {
  // 가독성 Good
  // 모든 상태관리 라이브러리에서도 동일한 패턴을 적용
  const {increment, decrement} = useCounterActions();
  return (
    <>      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button></>
  )
}
