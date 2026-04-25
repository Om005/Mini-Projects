use std::fs;
use chrono::{Utc, Local};

// same like class
struct User {
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}

struct Rect {
    width: u32,
    height: u32,
}

impl Rect {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    } 

    // same as static fn
    fn some_fn() {
        println!("This fn must be called without an instance");
    }
}


enum Direction {
    North,
    South,
    East,
    West,
}

impl Direction {
    fn move_right(&self) -> Direction {
        // pattern matching
        match self {
            Direction::North => Direction::East,
            Direction::East  => Direction::South,
            Direction::South => Direction::West,
            Direction::West  => Direction::North,
        }
    }
}

// enum with associated values

enum Shape {
    Circle(f64),          // radius
    Square(f64),          // side length
    Rectangle(f64, f64),  // width, height
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(radius) => 3.14 * radius * radius,
            Shape::Square(side) => side * side,
            Shape::Rectangle(width, height) => width * height,
        }
    }
}

// option and result are enums

// # Option enum: for nullable values
// if a function returs a value or null_value/nil/none ---> then it returns Option<T>
// fn some_fn(): Number | null {}

/*
enum Option<T> {
    Some(T),
    None,
}
*/

// # Result enum: for error handling
/*
enum Result<T, E> {
    Ok(T),
    Err(E),
}
*/

// cargo add crate_name  ---> to add dependencies

/*

let s4 = &mut s3;      // borrow starts
      |------------------------------|
      |  change_string(&mut s3) ❌   |
      |  let s6 = &mut s3 ❌         |
      |  let s5 = &s3 ❌             |
      |  good_print_string(&s3) ❌   |
      |------------------------------|
println!("{}", s4);   // borrow ends here


*/

fn main() {
    // println!("Hello, world!");

    // let _x: u32 = 5;
    // println!("`Is {} even? {}", _x, is_even(4294967295)); 

    // println!("The 10th Fibonacci number is {}", fibbo(11));

    // let my_string = String::from("Hello, world!");
    // println!("The length is {}", len_of(my_string));
    // // println!("{}", my_string);

    // let user1 = User {
    //     email: String::from("someone@example.com"),
    //     username: String::from("someusername123"),
    //     active: true,
    //     sign_in_count: 1,
    // };

    // println!("User email is: {}", user1.email);

    // let rect1 = Rect {
    //     width: 30,
    //     height: 50,
    // };
    // Rect::some_fn();


    // let my_direction = Direction::North;
    // match my_direction {
    //     Direction::North => println!("We are heading North!"),
    //     Direction::South => println!("We are heading South!"),
    //     Direction::East  => println!("We are heading East!"),
    //     Direction::West  => println!("We are heading West!"),
    // }

    // let new_str = String::from("Hello, world!");

    // let index = first_a_ind(&new_str);
    // match index {
    //     Some(i) => println!("The first 'a' is at index: {}", i),
    //     None    => println!("There is no 'a' in the string."),
    // }

    // let file_content = read_from_file("./file.txt");
    // match file_content {
    //     Ok(content) => println!("File content:\n{}", content),
    //     Err(e)      => println!("Error reading file: {}", e),
    // }

    // let now = Utc::now();
    // println!("Current date and time: {}", now);

    // let local_now = Local::now();
    // println!("Local date and time: {}", local_now);


    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2   
    // println!("{}", s1); // error: borrow of moved value: `s1`
    
    // print_string(s2); // s2 is moved into the function
    // println!("{}", s2); // error: borrow of moved value: `s2`
    let mut s3 = String::from("hello");

    let mut s4 = &mut s3; // s3 is borrowed by reference
    change_string(&mut s3); // s3 is borrowed by reference
    let mut s6 = &mut s3;
    let mut s5 = &s3; // s3 is borrowed by reference
    good_print_string(&s3); // s3 is borrowed by reference
    println!("{}", s3); // s3 is still valid here

    // let mut my_string = String::from("Hello, world!");
    // let mut ref1 = &mut my_string;
    // change_string(&mut my_string);
    // change_string(&mut my_string);
    // change_string(&mut my_string);
    // change_string(&mut my_string);
    // println!("{}", ref1);

    

}

fn change_string(s: &mut String) {
    s.push_str(", world");
}

fn good_print_string(s: &String) {
    println!("{}", s);
}

fn print_string(s: String) {
    println!("{}", s);
}

fn is_even(n: u32) -> bool {
    return n % 2 == 0;
}


fn fibbo(n: i32) -> i32 {
    let mut first = 0;
    let mut second = 1;
    if n==0 {
        return 0;
    }
    if n==1 {
        return 1;
    }

    // unused variable warning suppression ---> start with _
    for _i in 1..n-1 {
        let temp = first+second;
        first = second;
        second = temp;
    }
    return second;
}

fn len_of(s: String) -> usize {
    // without ; --> means return
    s.len()
}

fn first_a_ind(s: &str) -> Option<u32> {
    for (index, char) in s.chars().enumerate() {
        if char == 'a' {
            return Some(index as u32);
        }
    }
    return None; 
}

fn read_from_file(path: &str) -> Result<String, String> {
    let content = fs::read_to_string(path);
    match content {
        Ok(data) => Ok(data),
        Err(e)   => Err(format!("Error reading file: {}", e)),
        // Err(e)   => panic!("Error reading file: {}", e),
    }
}