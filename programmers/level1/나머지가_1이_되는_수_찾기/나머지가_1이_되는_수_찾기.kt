tailrec fun run(n: Int, x:Int = 2): Int {
    if (n % x == 1) {
        return x
    }
    
    return run(n, x + 1)
}
