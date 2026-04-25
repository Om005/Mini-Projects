// #[derive(Display)] ----> no sir, end user methods cannot be default
#[derive(Debug)] // ----> Debugging is for developers, lets give them default implementation
// derive macros ---> implement traits for you
struct User {
    name: String,
    age: u32,
}
struct User2 {
    name: String,
    age: u32,
}

impl std::fmt::Display for User {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "name is {}, age is {}", self.name, self.age)
    }
}

// impl std::fmt::Debug for User {
//     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//         write!(f, "name is {}, age is {}", self.name, self.age)
//     }
// }

macro_rules! vectorr {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

fn main() {
    println!("Hello, world!");
    let user1 = User {
        name: String::from("okrr"),
        age: 19,
    };

    println!("{:?}", user1);

    let v = vectorr![1, 2, 3, 4, 5];
    
}
