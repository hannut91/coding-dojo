func run(n, x int) int {
	if n%x == 1 {
		return x
	}

	return run(n, x+1)
}
