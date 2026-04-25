// if there are no any arguments in impl function of any struct then it can be called as StructName::function_name()

#[derive(Debug)]

struct User {
    name: String,
    age: u32,
}

impl std::fmt::Display for User {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "({}, {})", self.name, self.age)
    }
}

// impl std::fmt::Debug for User {
//     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//         write!(f, "({}, {})", self.name, self.age)
//     }
// }



fn main(){
    println!("Hello, world!");
    // ! --> macro invocation
    // before compilation, macros are expanded

    let user = User {
        name: String::from("Heet"),
        age: 20,
    };
    println!("{:?}", user); // --> goes to Display trait and calls fmt function of Display trait
    // println!("{:?}", user)   ---> goes to Debug trait and calls fmt function of Debug trait

    // test_advanced_macros();
    say_hi!();
    say_hi!("Om");
}






// ============================================
// TYPES OF MACROS IN RUST
// ============================================

// 1. DECLARATIVE MACROS (macro_rules!)
// - Most common type of macros
// - Pattern matching based
// - Defined using macro_rules!

// Simple declarative macro
macro_rules! say_hello {
    () => {
        println!("Hello from macro!");
    };
}

// Macro with arguments
macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("Function {:?} was called", stringify!($func_name));
        }
    };
}

// Macro with multiple patterns
macro_rules! print_result {
    ($expression:expr) => {
        println!("{} = {:?}", stringify!($expression), $expression);
    };
}

// Macro with repetition (variadic)
macro_rules! vec_of_strings {
    ($($element:expr),*) => {{
        let mut v = Vec::new();
        $(
            v.push($element.to_string());
        )*
        v
    }};
}

// 2. PROCEDURAL MACROS
// - More powerful and flexible
// - Three types: derive macros, attribute-like macros, function-like macros
// - Need separate crate with proc-macro = true

// Example of using derive macro (built-in)
#[derive(Debug, Clone)] // These are derive macros
struct Point {
    x: i32,
    y: i32,
}

// 3. ATTRIBUTE-LIKE MACROS
// - Similar to derive but can be applied to any item
// - Example: #[route(GET, "/")] in web frameworks

// 4. FUNCTION-LIKE MACROS
// - Look like function calls but operate on tokens
// - Example: sql!("SELECT * FROM users")

// ============================================
// TESTING MACROS
// ============================================

fn test_macros() {
    println!("\n=== Testing Declarative Macros ===");
    
    // Test simple macro
    say_hello!();
    
    // Test function creation macro
    create_function!(foo);
    foo();
    
    // Test expression macro
    print_result!(1 + 2);
    print_result!(5 * 3);
    
    // Test variadic macro
    let strings = vec_of_strings!("hello", "world", "rust");
    println!("Vector of strings: {:?}", strings);
    
    // Test derive macro
    let p = Point { x: 10, y: 20 };
    println!("Point: {:?}", p);
    let p2 = p.clone();
    println!("Cloned Point: {:?}", p2);
}

// ============================================
// ADVANCED MACRO PATTERNS
// ============================================

// Macro with different types of arguments
macro_rules! calculate {
    (add $a:expr, $b:expr) => {
        $a + $b
    };
    (mul $a:expr, $b:expr) => {
        $a * $b
    };
}

// Macro with optional arguments
macro_rules! log_message {
    ($msg:expr) => {
        println!("[INFO] {}", $msg);
    };
    ($level:expr, $msg:expr) => {
        println!("[{}] {}", $level, $msg);
    };
}

// Recursive macro (for compile-time calculation)
macro_rules! count_items {
    () => { 0 };
    ($head:expr) => { 1 };
    ($head:expr, $($tail:expr),+) => {
        1 + count_items!($($tail),+)
    };
}

fn test_advanced_macros() {
    println!("\n=== Testing Advanced Macros ===");
    
    println!("Addition: {}", calculate!(add 5, 3));
    println!("Multiplication: {}", calculate!(mul 4, 7));
    
    log_message!("Server started");
    log_message!("ERROR", "Something went wrong");
    
    let count = count_items!(1, 2, 3, 4, 5);
    println!("Item count: {}", count);
}