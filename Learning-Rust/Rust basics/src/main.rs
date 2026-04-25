// fn main() {
//     let mut x: i32 = 1;
//     let _z: f32 = 4.4;
//     //i8, i16, i32, i64, i128  ---> signed
//     //u8, u16, u32, u64, u128  ---> unsigned
//     //f8, f16, f32, f64, f128 
//     // by default its i32 (let x = 3)
    
//     println!("The value of x is {}",x);
//     x = 22;
//     println!("The value of x is {}",x);

//     let mut var: bool  = true;

//     let mut greetings: String = String::from("hello");
//     greetings = greetings+"yomj";
    
//     print!("Saying: {}", greetings);
//     let char1: Option<char> = greetings.chars().nth(0);

//     match char1 {
//         Some(c) => println!("{}", c),
//         None => println!("Noo"),
//     }

//     println!("char: {}", char1.unwrap()); // telling compiler that i am ok with any run time error

//     let is_even: bool = true;

//     if is_even {
//         println!("Even");
//     }
//     else{
//         println!("Odd");
//     }

//     for i in 0..100{
//         println!("{}", i)
//     }

//     let mut a = String::from("Hello heyy");
//     println!("{}, {}, {:p}", a.capacity(), a.len(), a.as_ptr());
//     a.push_str( "sfjlajs;ldfjakljsdlfkjaslk;djf;alsjdf;lajs;dlfja;ljsdl;kfja;kjsdf");
//     println!("{}, {}, {:p}", a.capacity(), a.len(), a.as_ptr());
//     let slice = &a[0..2];
//     println!("{}", slice);
//     println!("{}", get_first_word(a));

//     let s1 = String::from("Hello world");
//     let s2 = s1;
//     // println!("{}", s1);  -->> no sir 

//     // when owner gets out of scope heap data will be cleaned 


//     // let my_string = String::from("hey hey hey everybody hey");
//     let mut my_string = String::from("hey hey hey everybody hey");
//     // some_function(my_string);
//     // println!("{}", my_string);  ---> no sir, can it come back....? t
    
//     some_function(my_string.clone());
//     println!("{}", my_string);  //  ---> yes sir
    
    
    
//     my_string = some_function(my_string);
//     println!("{}", my_string);  

    
    
// }

// fn some_function(some_string: String) -> String{
//     println!("{}", some_string);
//     some_string

// }

// fn get_first_word(sentence: String) -> String{
//     let mut ans = String::from("");
//     for char in sentence.chars(){
//         if char == ' '{
//             break;
//         }
//         ans.push(char);
//     }
//     return ans;
// }
use std::env;

fn main() {
    // Collect command-line arguments into a vector
    let args: Vec<String> = env::args().collect();

    // args[0] is the program name
    println!("Program name: {}", args[0]);

    // Check if the user provided an argument
    if args.len() > 1 {
        println!("You provided the following arguments:");
        for (i, arg) in args[1..].iter().enumerate() {
            println!("Argument {}: {}", i + 1, arg);
        }
    } else {
        println!("No arguments provided. Try running like this:");
        println!("cargo run -- hello world");
    }
}
