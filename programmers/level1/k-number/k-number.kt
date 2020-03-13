fun solution(array: IntArray, commands: Array<IntArray>) =
    commands
        .map { (i, j, k) -> array.slice(i-1..j-1).sorted().get(k-1)}
        .toIntArray()
