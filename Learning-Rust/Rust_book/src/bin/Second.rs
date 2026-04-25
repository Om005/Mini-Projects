use std::io;

fn main() {
    another_function(5);
    let y = {
        let x = 3;
        x + 1
    };

    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }

    let condition = true;
    let number = if condition { 5 } else { 6 };
    // let number = if condition { 5 } else { "six" };  ---> if and else have incompatible types

    loop {
                        let a = [1, 2, 3, 4, 5];

                    let mut index = String::from("");
                    println!("Please enter index number: ");
                    io::stdin()
                        .read_line(&mut index)
                        .expect("Failed to read the line");

                    let index: usize = index
                        .trim()
                        .parse()
                        .expect("Idex enter was not a number");

                    let element = a[index];
                    println!("{element}");
    }
}

fn another_function(x: i32) {
    println!("The value of x is: {x}");
}