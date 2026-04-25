use std::io;

fn main(){
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