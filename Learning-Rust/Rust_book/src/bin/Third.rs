fn main() {
    // let mut counter = 0;

    // let result = loop {
    //     counter += 1;

    //     if counter == 10 {
    //         break counter * 2;  // --> loop can return value by "break return_value"
    //     }
    // };

    // println!("The result is {result}");

    // let mut count = 0;
    // 'counting_up: loop {
    //     println!("count = {count}");
    //     let mut remaining = 10;

    //     loop {
    //         println!("remaining = {remaining}");
    //         if remaining == 9 {
    //             break;
    //         }
    //         if count == 2 {
    //             break 'counting_up;
    //         }
    //         remaining -= 1;
    //     }

    //     count += 1;
    // }
    // println!("End count = {count}");

    // let mut number = 3;

    // while number != 0 {
    //     println!("{number}!");

    //     number -= 1;
    // }

    // for number in (1..4).rev() {
    //     println!("{number}!");
    // }
    // println!("LIFTOFF!!!");


    let word = String::from("Hello world!");

    let word2 = &word[0..4];

    println!("{word} {word2}");
    
    

    let word3 = give_first_word(&word);
    println!("{word3}");


}

fn give_first_word(str: &String) -> &str {
    let mut index = 0;
    
    for i in str.chars() {
        if i == ' '{
            break;
        }
        index += 1;
    }
    return &str[0..index];
}