
macro_rules! hello {
    () => {
        println!("Hello from macro!");
    };
}

macro_rules! say {
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

macro_rules! repeat {
    ($msg: expr, $times: expr) => {
        for _ in 0..$times {
            println!("{}", $msg);
        }
    };
}


macro_rules! log {
    ($msg:expr) => {
        println!("[INFO]: {}", $msg);
    };
    (error, $msg:expr) => {
        println!("[ERROR]: {}", $msg);
    };
}


// $( ... )*     // repeat zero or more times
// $( ... ),*    // repeat zero or more times, separated by commas
// $( ... )+     // repeat one or more times
// $( ... ),+    // repeat one or more times, separated by commas


macro_rules! print_all {
    ( $($x: expr),* ) => {
        $(
            println!("{}", $x);
        )*
    };
}

macro_rules! my_vec {
    ( $($ele: expr), * ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($ele);
            )*
            temp_vec
        }
    };
}

macro_rules! sum_all {
    ( $($x: expr);* ) => {
        {
            let mut sum = 0;
            $(
                sum += $x;
            )*
            sum
        }
    };
}



macro_rules! greet {
    () => {
        println!("Hello, stranger!");
    };
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

macro_rules! say_greet {
    ( $($greeting: expr ; $name: expr; $age: expr),* ) => {
        $(
            println!("{} {} is {} years old", $greeting, $name, $age);
        )*
    };
}

macro_rules! create_struct {
    ( $( $name: ident {$( $field: ident : $ftype: ty ),*} ),* ) => {
        $(
            struct $name {
                $(
                    $field : $ftype,
                )*
            }
        )*
    };
}

use macro_derive::Hello;
#[derive(Hello)]
struct Person {
    name: String,
    age: u8,
}

create_struct!(
    User {
        name: String,
        age: u8
    },
    Product {
        id: u32,
        name: String,
        price: f64
    }
);



fn main(){
    repeat!("Hello sir!", 2);
    hello!();
    say!("Alice");
    say!("Bob");
    print_all!("Hello", "World", 42);

    let k = sum_all!(1; 2; 3; 4; 5);
    say_greet!("Hi"; "Alice"; 30, "Hello"; "Bob"; 25);

}