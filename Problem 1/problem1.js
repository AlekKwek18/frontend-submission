let print = console.log

var sum_to_n_a = function(n) {
    // your code here
    // for loop way
    // time complexity: O(n)
    // space complexity: O(1)
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    };

    return sum;
}

var sum_to_n_b = function(n) {
    // your code here
    // summation forumla
    // best
    // time complexity: O(1)
    // space complexity: O(1)
    return n * (n + 1) / 2;
};

var sum_to_n_c = function(n) {
    // your code here
    // recursion
    // time complexity: O(n)
    // space complexity: O(n)
    // edge case
    if (n === 1) {
        return 1;
    } else {
        return n + sum_to_n_c(n - 1);
    }
};


print(sum_to_n_a(10)); // should return 15      
print(sum_to_n_b(10)); // should return 15     
print(sum_to_n_c(10)); // should return 15