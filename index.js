const reverse = penul => {
  const final = 1e6

  const ANS_MAX = 9007199254740991
  let today = penul
  let tomorrow = final
  let yesterday

  const TURN_MAX = 100
  const r_balances = [tomorrow, today]
  let turns = 0
  while(turns < TURN_MAX) {
    if (Math.abs(tomorrow - today) > ANS_MAX / 2) {
      break
    }
    yesterday = tomorrow - today
    tomorrow = today
    today = yesterday
    r_balances.push(today)
    turns++
  }

  if (!turns) {
    throw "Ran out of turns"
  }

  // const n1 = -21000055
  // const n2 = 13000034 -n1

  const n1 = today
  const n2 = tomorrow - yesterday

  const balances = [n1, n1 + n2]
  let pass = false
  for (var i2=0;i2<TURN_MAX+2;i2++) {
    const last_two = balances.slice(balances.length-2)
    balances.push(last_two[0] + last_two[1])
    if (balances[balances.length-1] === final) {
      pass = true
      break
    }
  }
  if (!pass) {
    throw "WTF"
  }
  return {
    turns,
    balances,
    n1,
    n2
  }
}

const PENUL_MAX = 10000000
let max_turns = 0
let best_result
for (var penul=1; penul<PENUL_MAX; penul++) {
  const result = reverse(penul)
  if (result.turns > max_turns) {
    max_turns = result.turns
    // console.log(result)
    best_result = result
  }
  const result2 = reverse(-penul)
  if (result2.turns > max_turns) {
    max_turns = result2.turns
    // console.log(result2)
    best_result = result2
  }
}

const test = (result) => {
  const balances = [result.n1, result.n2+result.n1]
  let turns = result.turns
  while (balances[balances.length-1] !== 1e6 && turns) {
    const last_two = balances.slice(balances.length-2)
    balances.push(last_two[0] + last_two[1])
    turns --
  }
  if (balances.pop() !== 1e6) {
    throw "Found a baddie!"
  }
  console.log("BEST RESULT", result)
}

test(best_result)